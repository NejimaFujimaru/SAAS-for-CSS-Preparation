/**
 * Fetcher Module
 * Handles URL fetching via serverless function and file uploads
 */

const Fetcher = {
    // Serverless function endpoints
    fetchEndpoint: '/api/fetch-article',
    generateEndpoint: '/api/generate-content',
    fileEndpoint: '/api/process-file',
    
    /**
     * Fetch content from a URL using serverless function
     * @param {string} url - The target URL
     * @returns {Promise<object>} - Object with title, content, and metadata
     */
    async fetchArticle(url) {
        if (!url || !url.startsWith('http')) {
            throw new Error('Invalid URL format');
        }

        try {
            const response = await fetch(this.fetchEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                return {
                    success: true,
                    title: data.title,
                    content: data.content,
                    source: url,
                    fetchedAt: data.fetchedAt
                };
            } else if (data.success === false && data.partialContent) {
                // Partial success - site blocked but got some content
                return {
                    success: false,
                    error: data.error,
                    suggestion: data.suggestion,
                    partialContent: data.partialContent,
                    title: data.title
                };
            } else {
                throw new Error(data.error || data.message || 'Failed to fetch article');
            }
        } catch (error) {
            console.error('Fetch article error:', error);
            throw error;
        }
    },

    /**
     * Upload and process a file (PDF, TXT, DOCX, CSV, Excel)
     * @param {File} file - The file to process
     * @returns {Promise<object>} - Object with extracted text content
     */
    async processFile(file) {
        if (!file) {
            throw new Error('No file provided');
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(this.fileEndpoint, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                return {
                    success: true,
                    title: data.title,
                    content: data.content,
                    fileName: data.fileName,
                    fileType: data.fileType,
                    processedAt: data.processedAt
                };
            } else if (data.success === false) {
                return {
                    success: false,
                    error: data.error,
                    suggestion: data.suggestion || 'Please try a different file format or paste text manually.'
                };
            } else {
                throw new Error(data.error || 'Failed to process file');
            }
        } catch (error) {
            console.error('Process file error:', error);
            throw error;
        }
    },

    /**
     * Generate content using AI (OpenRouter free model)
     * @param {string} content - The source content
     * @param {string} taskType - Type of generation (full_notebook, mcqs, vocabulary, essay, facts_extraction, classification)
     * @param {string} extraContext - Optional additional context
     * @returns {Promise<object>} - Generated content
     */
    async generateWithAI(content, taskType, extraContext = '') {
        if (!content || !taskType) {
            throw new Error('Content and task type are required');
        }

        try {
            const response = await fetch(this.generateEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    taskType,
                    extraContext
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                throw new Error(data.error || data.details || 'AI generation failed');
            }
        } catch (error) {
            console.error('AI generation error:', error);
            throw error;
        }
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
