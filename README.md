# CSS Current Affairs Notebook

A lightweight, high-performance SaaS-style web application that converts raw news content into structured, exam-ready study material for Pakistani competitive exam aspirants (CSS, PMS, FPSC, PPSC, NTS, FIA).

## Features

- **Structured Notes**: Transform any article into exam-ready analytical breakdowns
- **Vocabulary Intelligence**: Extract advanced words with meanings, synonyms, antonyms, and Urdu translations
- **MCQ Generation**: Auto-generate practice questions from articles
- **Essay Material**: Get thesis statements, arguments, and essay topics
- **CSS Relevance Mapping**: Score-based classification for CSS subjects
- **Offline Support**: Works entirely in-browser using localStorage
- **Dark/Light Mode**: Toggle between themes for comfortable reading
- **Export Options**: Export to PDF, Markdown, or copy to clipboard

## Quick Start

1. Clone this repository
2. Open `index.html` in your browser
3. Paste any news article text
4. Click "Generate Notebook"

No installation, no backend, no authentication required!

## Usage

### Generate a Notebook

1. Copy text from any news article (DAWN, The News, etc.)
2. Paste it into the input box in the sidebar
3. Click "Generate Notebook" or press Ctrl+Enter
4. View your structured study material

### Saved Notebooks

- All notebooks are automatically saved to browser storage
- Search through your saved notebooks
- Click any notebook to view it again
- Delete notebooks you no longer need

### Export

Click the "Export" button to:
- Print/Save as PDF
- Download as Markdown
- Copy all content to clipboard

## Technical Details

### Architecture

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript (ES6+)** - No frameworks, minimal dependencies
- **localStorage API** - Client-side data persistence

### Modules

- `classifier.js` - Rule-based keyword classification
- `vocabulary.js` - Word extraction and intelligence
- `generator.js` - Content generation logic
- `storage.js` - localStorage handling
- `export.js` - PDF/Markdown export
- `ui.js` - Rendering system
- `app.js` - Main controller

### Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select main branch
4. Your site will be live at `https://username.github.io/repo-name`

### Vercel

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push

## Future Enhancements

- AI API integration (OpenAI/Gemini) for better content generation
- Cloud storage sync
- User authentication
- Real-time news ingestion
- Mobile app version

## License

MIT License - Feel free to use and modify for your preparation!

---

Built for CSS aspirants, by CSS aspirants. 🇵🇰
