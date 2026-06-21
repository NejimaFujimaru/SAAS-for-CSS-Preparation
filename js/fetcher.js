/**
 * Fetcher Module
 * Handles URL fetching via CORS proxy and content extraction
 */

const Fetcher = {
    // Serverless function endpoint for fetching articles
    serverlessEndpoint: '/api/fetch-article',
    
    // Public CORS proxies (fallback list if one fails) - kept as backup
    proxies: [
        'https://api.allorigins.win/raw?url=',
        'https://thingproxy.freeboard.io/fetch/',
        'https://corsproxy.sciencedirect.com/api/allorigins/win/raw?url='
    ],

    /**
     * Fetch content from a URL
     * @param {string} url - The target URL
     * @returns {Promise<string>} - Cleaned text content
     */
    async fetchArticle(url) {
        if (!url || !url.startsWith('http')) {
            throw new Error('Invalid URL format');
        }

        let lastError;
        
        // Try serverless endpoint first (if available)
        try {
            const response = await fetch(`${this.serverlessEndpoint}?url=${encodeURIComponent(url)}`);
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    return data.content;
                }
            }
        } catch (error) {
            console.warn('Serverless endpoint failed:', error.message);
            lastError = error;
        }
        
        // Fallback to public CORS proxies
        for (const proxy of this.proxies) {
            try {
                const response = await fetch(proxy + encodeURIComponent(url));
                
                if (!response.ok) {
                    throw new Error(`Proxy failed with status ${response.status}`);
                }

                const html = await response.text();
                return this.extractContent(html, url);
            } catch (error) {
                console.warn(`Proxy ${proxy} failed:`, error.message);
                lastError = error;
                continue;
            }
        }

        throw new Error(`Failed to fetch article. All proxies failed. Last error: ${lastError?.message}`);
    },

    /**
     * Extract main content from raw HTML
     * Uses heuristics to find article body and remove noise
     * @param {string} html - Raw HTML string
     * @param {string} baseUrl - Original URL for resolving relative links
     * @returns {string} - Cleaned text
     */
    extractContent(html, baseUrl) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Remove script, style, nav, footer, header, ads
        const tagsToRemove = ['script', 'style', 'nav', 'footer', 'header', 'iframe', 'noscript', 'form'];
        tagsToRemove.forEach(tag => {
            const elements = doc.querySelectorAll(tag);
            elements.forEach(el => el.remove());
        });

        // Remove common ad classes/IDs
        const adPatterns = ['ad-', 'advertisement', 'sponsor', 'social-share', 'related-news', 'comments', 'sidebar'];
        adPatterns.forEach(pattern => {
            const elements = doc.querySelectorAll(`[class*="${pattern}"], [id*="${pattern}"]`);
            elements.forEach(el => el.remove());
        });

        // Heuristic: Find the main content container
        // Look for <article>, <main>, or divs with high text density
        let contentContainer = 
            doc.querySelector('article') || 
            doc.querySelector('main') || 
            doc.querySelector('.article-body') ||
            doc.querySelector('.story-content') ||
            doc.querySelector('.content') ||
            doc.querySelector('body');

        if (!contentContainer) {
            throw new Error('Could not identify article content structure.');
        }

        // Extract text from paragraphs and headings
        const paragraphs = contentContainer.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
        let textContent = [];

        paragraphs.forEach(el => {
            const text = el.textContent.trim();
            // Filter out very short lines (likely buttons or labels)
            if (text.length > 20) {
                textContent.push(text);
            }
        });

        if (textContent.length === 0) {
            throw new Error('No readable article content found. The site might be blocking scrapers.');
        }

        return textContent.join('\n\n');
    },

    /**
     * Validate URL format
     */
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Fetcher;
}
