# CSS Current Affairs Notebook - Setup Instructions

## 🚀 Quick Start

### Step 1: Get Your Free OpenRouter API Key

1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up for a free account (or login)
3. Create a new API key
4. Copy your API key (starts with `sk-or-...`)

### Step 2: Configure API Key on Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project name
3. Go to **Settings** → **Environment Variables**
4. Click **Add Environment Variable**
5. Add the following:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: `your_api_key_here` (paste your actual key)
6. Click **Save**
7. **Redeploy** your project for changes to take effect

#### Option B: Vercel CLI

If you have Vercel CLI installed:

```bash
vercel env add OPENROUTER_API_KEY
# Follow prompts to enter your API key
vercel --prod
```

### Step 3: Verify Deployment

1. After redeployment, visit your live site
2. Try fetching a URL or uploading a file
3. Check browser console for any errors

---

## 📁 File Upload Support

The application now supports multiple file formats:

| Format | Extension | Support Level |
|--------|-----------|---------------|
| Plain Text | `.txt` | ✅ Full |
| PDF | `.pdf` | ⚠️ Basic (text-based PDFs only) |
| Word Document | `.docx`, `.doc` | ⚠️ Limited (copy-paste recommended) |
| CSV | `.csv` | ✅ Full |
| Excel | `.xlsx`, `.xls` | ⚠️ Limited (copy-paste recommended) |

**Note:** For best results with PDF/DOCX/Excel files, consider copying the text content and pasting it directly.

---

## 🔧 How It Works

### URL Fetching
- Uses Vercel Edge Functions to bypass CORS restrictions
- Server-side fetching prevents browser security blocks
- Automatic content extraction from HTML

### AI Generation
- Uses OpenRouter's free model (`openrouter/free`)
- Generates: notebooks, MCQs, vocabulary, essays, classifications
- Falls back to offline generation if AI is unavailable

### File Processing
- Files are processed server-side via Edge Functions
- Text extraction happens before AI processing
- Maximum file size: 10MB

---

## 🛠️ Troubleshooting

### "AI generation failed" error
- Check that `OPENROUTER_API_KEY` is set correctly in Vercel
- Verify your API key is active on OpenRouter
- Check Vercel function logs for detailed errors

### "Failed to fetch article" error
- Some websites block automated access
- Try pasting the article text manually
- Try a different news source

### File upload not working
- Ensure file is under 10MB
- For PDFs, ensure they are text-based (not scanned images)
- Try converting DOCX/Excel to plain text first

---

## 📝 Local Development

To test locally with environment variables:

1. Create a `.env.local` file in the project root:
```
OPENROUTER_API_KEY=your_api_key_here
```

2. Install dependencies:
```bash
npm install
```

3. Run Vercel dev server:
```bash
npx vercel dev
```

---

## 🎯 Usage Tips

1. **URL Input**: Paste direct article links (not homepage URLs)
2. **File Upload**: Use for research papers, reports, documents
3. **Text Paste**: Most reliable method for any content
4. **AI Mode**: Always tries AI first, falls back to offline
5. **Saved Notebooks**: All notebooks saved in browser localStorage

---

## 📞 Support

For issues or questions:
- Check Vercel function logs
- Verify API key configuration
- Review browser console for errors
