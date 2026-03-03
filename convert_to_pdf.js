const fs = require('fs');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');

async function convert() {
    try {
        const mdFile = 'C:\\Users\\clebe\\.gemini\\antigravity\\brain\\3c34f73d-e0d3-470b-ac33-8e7369667339\\manual-squads-notebooklm.md';
        const pdfFile = 'C:\\Users\\clebe\\.gemini\\antigravity\\brain\\3c34f73d-e0d3-470b-ac33-8e7369667339\\manual-squads.pdf';

        // Read markdown
        const mdContent = fs.readFileSync(mdFile, 'utf-8');

        // Convert to simple HTML
        const md = new MarkdownIt();
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333; }
          h1, h2, h3 { color: #111; }
          code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${md.render(mdContent)}
      </body>
      </html>
    `;

        // Print with Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await page.pdf({ path: pdfFile, format: 'A4', margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' } });
        await browser.close();

        console.log('PDF Generated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

convert();
