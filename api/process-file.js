export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
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

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    let textContent = '';

    // Read file as text based on type
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      textContent = await file.text();
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // For PDFs, we'll extract basic text (limited in edge functions)
      // In production, use a proper PDF parsing service
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      // Basic text extraction from PDF (simple approach)
      textContent = extractTextFromPDF(uint8Array);
      if (!textContent || textContent.length < 50) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Could not extract text from PDF. Please convert to text first or paste content manually.',
            suggestion: 'PDF parsing requires server-side processing. Please copy text from PDF and paste it.'
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            }
          }
        );
      }
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
      // DOCX files are ZIP archives with XML inside
      // Limited extraction in edge functions
      return new Response(
        JSON.stringify({
          success: false,
          error: 'DOCX parsing requires additional processing.',
          suggestion: 'Please open the DOCX file, copy the text, and paste it directly.'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    } else if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
      textContent = await file.text();
      // Format CSV data nicely
      textContent = `CSV Data from ${fileName}:\n\n${textContent}`;
    } else if (fileType.includes('excel') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Excel parsing requires additional processing.',
          suggestion: 'Please open the Excel file, copy the relevant data, and paste it as text.'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    } else {
      // Try to read as text for unknown types
      textContent = await file.text();
    }

    if (!textContent || textContent.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'File appears to be empty or unreadable' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // Limit content length
    const maxLength = 50000;
    if (textContent.length > maxLength) {
      textContent = textContent.substring(0, maxLength) + '\n\n... [Content truncated due to length]';
    }

    return new Response(
      JSON.stringify({
        success: true,
        title: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
        content: textContent,
        fileName: file.name,
        fileType: file.type,
        processedAt: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    console.error('Error processing file:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process file',
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

// Simple PDF text extraction (basic implementation)
function extractTextFromPDF(uint8Array) {
  // Convert to string and look for readable text patterns
  // This is a very basic approach - real PDF parsing needs proper libraries
  let text = '';
  const decoder = new TextDecoder('utf-8');
  
  try {
    // Try to decode as UTF-8
    text = decoder.decode(uint8Array);
    
    // Extract streams that might contain text
    const streamMatches = text.match(/stream([\s\S]*?)endstream/g);
    if (streamMatches) {
      text = streamMatches.map(s => s.replace(/stream|endstream/g, '')).join(' ');
    }
    
    // Clean up PDF syntax
    text = text
      .replace(/[0-9]+\s+[0-9]+\s+obj/g, '')
      .replace(/endobj/g, '')
      .replace(/<</g, '')
      .replace(/>>/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\/[A-Za-z]+/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\s+/g, ' ')
      .trim();
      
  } catch (e) {
    text = '';
  }
  
  return text;
}
