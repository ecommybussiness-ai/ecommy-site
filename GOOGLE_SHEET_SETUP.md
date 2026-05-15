# Google Sheet Lead Capture Setup

Use this site with a Google Apps Script web app so every form submission lands in your Google Sheet.

## 1. Create the Sheet

Create a Google Sheet with these headers in row 1:

- Timestamp
- Source
- Name
- Email
- Mobile
- Service
- Subject
- Message
- Page URL

## 2. Add Apps Script

Open **Extensions -> Apps Script** and paste this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const data = e.parameter;

  sheet.appendRow([
    new Date(),
    data.source || '',
    data.name || '',
    data.email || '',
    data.mobile || '',
    data.service || '',
    data.subject || '',
    data.message || '',
    data.pageUrl || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy as Web App

- Click **Deploy**
- Choose **New deployment**
- Select **Web app**
- Set access to **Anyone**
- Copy the Web App URL

## 4. Paste the URL in the site

Open `js/main.js` and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

with your real Web App URL.

## 5. Forms connected

This site already sends data from:

- Home page quote form
- Quote page form
- Contact form

