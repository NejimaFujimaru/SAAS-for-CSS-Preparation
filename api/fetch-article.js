import { parse } from 'node-html-parser';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }

  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return new Response(
      JSON.stringify({ error: 'URL parameter is required' }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }

  // Validate URL format
  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid URL format' }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }

  try {
    // Fetch the article content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();

    // Parse HTML and extract main content
    const root = parse(html);
    
    // Remove unwanted elements
    root.querySelectorAll('script, style, nav, header, footer, iframe, .ads, .advertisement, .sidebar, .comments').forEach(el => el.remove());
    
    // Try to find main article content using common selectors
    let articleContent = '';
    const mainSelectors = [
      'article',
      '.article-content',
      '.article-body',
      '.post-content',
      '.entry-content',
      '[itemprop="articleBody"]',
      '.story-content',
      '.news-content'
    ];

    for (const selector of mainSelectors) {
      const element = root.querySelector(selector);
      if (element) {
        articleContent = element.textContent.trim();
        break;
      }
    }

    // Fallback: get all text content if no specific article found
    if (!articleContent) {
      articleContent = root.querySelector('body')?.textContent.trim() || '';
    }

    // Clean up extra whitespace
    articleContent = articleContent.replace(/\s+/g, ' ').trim();

    // Extract title
    let title = root.querySelector('h1')?.textContent.trim() || 
                root.querySelector('title')?.textContent.trim() || 
                'Untitled Article';

    // Limit content length to prevent oversized responses
    const maxLength = 50000;
    if (articleContent.length > maxLength) {
      articleContent = articleContent.substring(0, maxLength) + '... [Content truncated]';
    }

    return new Response(
      JSON.stringify({
        success: true,
        title: title,
        content: articleContent,
        url: url,
        fetchedAt: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );

  } catch (error) {
    console.error('Error fetching article:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch article',
        message: error.message 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}
