/**
 * Vercel Serverless Function: /api/contact
 * Handles contact & project inquiry submissions and appends them to Google Sheets.
 */

import { google } from 'googleapis';

// Basic email validation regex (RFC 5322 compliant simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory deduplication cache (15-second window per email + message)
const recentSubmissions = new Map();
const DEDUPE_WINDOW_MS = 15000;

/**
 * Trim and remove harmful control characters.
 * @param {unknown} val
 * @returns {string}
 */
function sanitizeString(val) {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Check and record duplicate submissions within the deduplication window.
 * @param {string} key
 * @returns {boolean}
 */
function checkDuplicate(key) {
  const now = Date.now();
  // Clean up expired keys
  for (const [k, time] of recentSubmissions.entries()) {
    if (now - time > DEDUPE_WINDOW_MS) {
      recentSubmissions.delete(k);
    }
  }

  if (recentSubmissions.has(key)) {
    return true;
  }

  recentSubmissions.set(key, now);
  return false;
}

/**
 * Safely normalize the Google service account private key.
 * Handles:
 * - Literal escaped newlines (\n) converted to actual newlines
 * - Already existing real newlines preserved without corruption
 * - Surrounding quotes (double or single quotes commonly added when pasting into Vercel UI)
 * - Windows-style carriage returns (\r\n or \r)
 * @param {string} rawKey
 * @returns {string}
 */
function normalizePrivateKey(rawKey) {
  if (!rawKey) return '';
  let key = rawKey.trim();

  // Strip wrapping double or single quotes if present
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }

  // Convert escaped literal newlines (\n) into actual newlines
  key = key.replace(/\\n/g, '\n');

  // Normalize Windows-style carriage returns to standard newlines
  key = key.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  return key;
}

/**
 * Initialize authenticated Google Sheets client.
 */
function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID ? process.env.GOOGLE_SHEET_ID.replace(/['"]/g, '').trim() : undefined;

  if (!clientEmail || !rawKey || !sheetId) {
    throw new Error('Google Sheets server configuration is missing.');
  }

  // Safely normalize private key for Google JWT auth
  const privateKey = normalizePrivateKey(rawKey);

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return {
    sheets: google.sheets({ version: 'v4', auth }),
    spreadsheetId: sheetId,
  };
}

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // 2. Parse request body if necessary
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Malformed JSON payload.'
        });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body.'
      });
    }

    // 3. Honeypot / anti-spam validation
    const honeypot = sanitizeString(body.honeypot || body._gotcha);
    if (honeypot) {
      return res.status(400).json({
        success: false,
        error: 'Spam submission detected.'
      });
    }

    // 4. Extract and sanitize fields
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email);
    const projectType = sanitizeString(body.projectType);
    const message = sanitizeString(body.message);

    const company = sanitizeString(body.company);
    const phone = sanitizeString(body.phone);
    const budget = sanitizeString(body.budget);
    const website = sanitizeString(body.website);
    const source = sanitizeString(body.source) || 'Website';
    const page = sanitizeString(body.page) || '/';
    const referrer = sanitizeString(body.referrer);
    const utm_source = sanitizeString(body.utm_source);
    const utm_medium = sanitizeString(body.utm_medium);
    const utm_campaign = sanitizeString(body.utm_campaign);
    const utm_content = sanitizeString(body.utm_content);
    const utm_term = sanitizeString(body.utm_term);
    const userAgent = sanitizeString(req.headers['user-agent'] || '');

    // 5. Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your name.'
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your email address.'
      });
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    if (!projectType) {
      return res.status(400).json({
        success: false,
        error: 'Please select a project type or scope.'
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide some details about your project.'
      });
    }

    // 6. Check for duplicate submission within 15 seconds
    const dedupeKey = `${email.toLowerCase()}_${message.toLowerCase()}`;
    if (checkDuplicate(dedupeKey)) {
      return res.status(200).json({
        success: true,
        message: 'Inquiry already received.'
      });
    }

    // 7. Format current timestamp
    const timestamp = new Date().toISOString();

    // 8. Connect to Google Sheets and append new row
    const { sheets, spreadsheetId } = getGoogleSheetsClient();

    // Row schema matching the "Leads" sheet header order:
    // 1. Timestamp
    // 2. Name
    // 3. Email
    // 4. Company
    // 5. Phone
    // 6. Project Type
    // 7. Budget
    // 8. Website
    // 9. Message
    // 10. Page
    // 11. Referrer
    // 12. Source
    // 13. UTM Source
    // 14. UTM Medium
    // 15. UTM Campaign
    // 16. UTM Content
    // 17. UTM Term
    // 18. User Agent
    // 19. Status ("New")
    const rowValues = [
      timestamp,
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      website,
      message,
      page,
      referrer,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      userAgent,
      'New'
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:S',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    // Log safe error message without exposing credentials or secrets
    console.error('Google Sheets submission error:', error.message || 'Unknown error');

    return res.status(500).json({
      success: false,
      error: 'Failed to record your inquiry. Please try again or reach out via WhatsApp/Email.'
    });
  }
}
