import { OpenAI } from 'openai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { content, taskType, extraContext } = await req.json();

    if (!content || !taskType) {
      return new Response(JSON.stringify({ error: 'Missing content or taskType' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'https://saas-for-css-preparation.vercel.app',
        'X-Title': 'CSS Current Affairs Notebook',
      },
    });

    let systemPrompt = 'You are an expert CSS (Central Superior Services) exam preparation assistant for Pakistan. You create high-quality, structured study materials from provided content.';
    let userPrompt = '';

    switch (taskType) {
      case 'full_notebook':
        userPrompt = `Analyze the following article/content and generate a complete CSS preparation notebook with these sections:
        
1. **Issue Title**: Concise, exam-oriented title
2. **Executive Summary**: 150-250 words professional summary
3. **Background**: Historical and contextual explanation
4. **Key Facts**: Dates, events, institutions, figures, agreements (bullet points)
5. **Causes**: Root causes of the issue
6. **Effects/Implications**: Political, Economic, Social, International impacts
7. **Pakistan Perspective**: Specific relevance to Pakistan
8. **CSS Relevance Mapping**: Score (0-10) for: Current Affairs, Pakistan Affairs, International Relations, Economy, Governance, Environment, Science & Technology
9. **Stakeholder Analysis**: Key actors involved
10. **Arguments For**: Supporting perspectives
11. **Arguments Against**: Opposing perspectives
12. **Policy Recommendations**: Practical solutions

Content to analyze:
${content}

${extraContext ? 'Additional context: ' + extraContext : ''}

Format the output as valid JSON with keys matching the section names above.`;
        break;

      case 'mcqs':
        userPrompt = `Generate exactly 10 multiple-choice questions (MCQs) based on the following content for CSS exam preparation. Each MCQ must have:
- Question text
- 4 options (A, B, C, D)
- Correct answer (letter)
- Brief explanation

Content:
${content}

Output as a JSON array of objects with keys: question, options (array), correctAnswer, explanation.`;
        break;

      case 'vocabulary':
        userPrompt = `Extract 15-20 advanced vocabulary words from the following content that are important for CSS exams. For each word provide:
- Word
- Part of speech
- Simple English meaning
- Urdu meaning (in Roman Urdu or Urdu script if possible)
- 2-5 Synonyms
- 2-5 Antonyms
- Example sentence using the word
- CSS importance score: Low, Medium, or High

Content:
${content}

Output as a JSON array of objects with keys: word, partOfSpeech, englishMeaning, urduMeaning, synonyms, antonyms, exampleSentence, cssImportance.`;
        break;

      case 'essay':
        userPrompt = `Generate a complete essay outline based on the following content for CSS exams:
- Introduction (with hook)
- Thesis statement
- 5 structured arguments with supporting points
- 1 counter-argument with rebuttal
- Conclusion outline
- 5 suggested essay titles

Content:
${content}

Output as JSON with keys: introduction, thesisStatement, arguments (array of 5), counterArgument, conclusion, essayTitles (array of 5).`;
        break;

      case 'facts_extraction':
        userPrompt = `Extract all key facts from the following content including dates, names, statistics, locations, organizations, and important figures. Format as categorized bullet points.

Content:
${content}

Output as JSON with categories as keys and arrays of facts as values.`;
        break;

      case 'classification':
        userPrompt = `Classify the following content into CSS exam categories with confidence scores (0-100):
- Current Affairs
- Pakistan Affairs
- International Relations
- Economy
- Governance
- Environment
- Science & Technology
- Education
- Health
- Energy
- Security

Content:
${content}

Output as JSON array of objects with keys: category, score.`;
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid task type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    const completion = await openai.chat.completions.create({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Try to parse as JSON
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify({ success: true, data: parsed }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    } catch (e) {
      // If JSON parsing fails, return raw text
    }

    return new Response(JSON.stringify({ success: true, data: responseText }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('AI generation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate content', 
      details: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
