/**
 * App Module
 * Main controller and application initialization
 */

const App = {
    currentFile: null,
    
    /**
     * Initialize the application
     */
    init() {
        console.log('CSS Current Affairs Notebook initializing...');
        
        // Initialize UI components
        UI.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load saved notebooks
        this.loadNotebooksList();
        
        console.log('Application initialized successfully!');
    },

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Process button
        const processBtn = document.getElementById('processBtn');
        processBtn.addEventListener('click', () => this.processArticle());

        // Fetch URL button
        const fetchUrlBtn = document.getElementById('fetchUrlBtn');
        fetchUrlBtn.addEventListener('click', () => this.fetchFromURL());

        // Delete notebook button
        const deleteBtn = document.getElementById('deleteNotebookBtn');
        deleteBtn.addEventListener('click', () => this.deleteCurrentNotebook());

        // File upload handler
        const fileUpload = document.getElementById('fileUpload');
        fileUpload.addEventListener('change', (e) => this.handleFileUpload(e));

        // Allow Ctrl+Enter to process article
        const articleInput = document.getElementById('articleInput');
        articleInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.processArticle();
            }
        });

        // Allow Enter key in URL input to trigger fetch
        const articleUrlInput = document.getElementById('articleUrl');
        articleUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.fetchFromURL();
            }
        });
    },

    /**
     * Handle file upload
     */
    async handleFileUpload(event) {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            UI.showToast('File size must be less than 10MB');
            event.target.value = '';
            return;
        }

        this.currentFile = file;

        // Display file name
        const fileNameDisplay = document.getElementById('fileNameDisplay');
        fileNameDisplay.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        fileNameDisplay.classList.add('active');

        try {
            UI.showLoading();
            UI.updateLoadingMessage(`Processing ${file.name}...`);

            // Process file through serverless function
            const result = await Fetcher.processFile(file);

            if (result.success) {
                // Put extracted content in textarea
                document.getElementById('articleInput').value = result.content;
                
                UI.hideLoading();
                UI.showToast(`Successfully extracted text from ${file.name}`);
                
                // Auto-process the extracted content
                setTimeout(() => this.processArticle(), 500);
            } else {
                UI.hideLoading();
                UI.showToast(result.error || 'Failed to process file');
                
                if (result.suggestion) {
                    alert(result.suggestion);
                }
                
                event.target.value = '';
                this.currentFile = null;
                fileNameDisplay.classList.remove('active');
            }
        } catch (error) {
            console.error('File upload error:', error);
            UI.hideLoading();
            UI.showToast('Error processing file. Please try again.');
            event.target.value = '';
            this.currentFile = null;
            fileNameDisplay.classList.remove('active');
        }
    },

    /**
     * Process article from input using AI
     */
    async processArticle() {
        const articleInput = document.getElementById('articleInput');
        const articleText = articleInput.value.trim();

        if (!articleText || articleText.length < 50) {
            UI.showToast('Please enter a valid article (at least 50 characters)');
            return;
        }

        try {
            // Show loading state with AI indicator
            UI.showLoading();
            UI.updateLoadingMessage('🤖 AI is generating your notebook...');

            // Use AI to generate full notebook
            const aiResult = await Fetcher.generateWithAI(articleText, 'full_notebook');
            
            if (!aiResult.success || !aiResult.data) {
                throw new Error('AI generation failed');
            }

            const notebookData = aiResult.data;

            // Generate MCQs with AI
            UI.updateLoadingMessage('🤖 AI is creating MCQs...');
            const mcqsResult = await Fetcher.generateWithAI(articleText, 'mcqs');
            const mcqs = mcqsResult.success && mcqsResult.data ? mcqsResult.data : Generator.generateMCQs(articleText);

            // Generate vocabulary with AI
            UI.updateLoadingMessage('🤖 AI is extracting vocabulary...');
            const vocabResult = await Fetcher.generateWithAI(articleText, 'vocabulary');
            const vocabulary = vocabResult.success && vocabResult.data ? vocabResult.data : Vocabulary.extractWords(articleText);

            // Generate essay outline with AI
            UI.updateLoadingMessage('🤖 AI is preparing essay material...');
            const essayResult = await Fetcher.generateWithAI(articleText, 'essay');
            const essay = essayResult.success && essayResult.data ? essayResult.data : Generator.generateEssayOutline(articleText);

            // Classify with AI
            UI.updateLoadingMessage('🤖 AI is classifying content...');
            const classResult = await Fetcher.generateWithAI(articleText, 'classification');
            let classification = {};
            if (classResult.success && classResult.data && Array.isArray(classResult.data)) {
                classResult.data.forEach(item => {
                    classification[item.category] = item.score;
                });
            }
            if (Object.keys(classification).length === 0) {
                classification = Classifier.classifyArticle(articleText);
            }

            // Create notebook object
            const notebook = {
                id: Date.now().toString(),
                title: notebookData.issueTitle || Generator.extractTitle(articleText),
                createdAt: new Date().toISOString(),
                sourceText: articleText.substring(0, 500),
                content: {
                    issueTitle: notebookData.issueTitle || 'Untitled',
                    executiveSummary: notebookData.executiveSummary || '',
                    background: notebookData.background || '',
                    keyFacts: notebookData.keyFacts || [],
                    causes: notebookData.causes || [],
                    effects: notebookData.effects || [],
                    pakistanPerspective: notebookData.pakistanPerspective || '',
                    cssRelevance: classification,
                    stakeholderAnalysis: notebookData.stakeholderAnalysis || [],
                    argumentsFor: notebookData.argumentsFor || [],
                    argumentsAgainst: notebookData.argumentsAgainst || [],
                    policyRecommendations: notebookData.policyRecommendations || []
                },
                mcqs: mcqs,
                vocabulary: vocabulary,
                essay: essay
            };

            // Save to storage
            Storage.saveNotebook(notebook);

            // Display notebook
            UI.displayNotebook(notebook);

            // Refresh notebooks list
            this.loadNotebooksList();

            // Clear inputs
            articleInput.value = '';
            const fileNameDisplay = document.getElementById('fileNameDisplay');
            fileNameDisplay.classList.remove('active');
            if (this.currentFile) {
                document.getElementById('fileUpload').value = '';
                this.currentFile = null;
            }

            // Hide loading
            UI.hideLoading();

            UI.showToast('✨ AI-generated notebook ready!');
        } catch (error) {
            console.error('Error processing article:', error);
            UI.hideLoading();
            
            // Fallback to rule-based generation if AI fails
            if (error.message.includes('API') || error.message.includes('AI')) {
                UI.showToast('AI unavailable. Using offline generation...');
                this.processArticleOffline();
            } else {
                UI.showToast('Error processing article. Please try again.');
            }
        }
    },

    /**
     * Fallback offline processing without AI
     */
    async processArticleOffline() {
        const articleInput = document.getElementById('articleInput');
        const articleText = articleInput.value.trim();

        try {
            UI.showLoading();

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Generate notebook using rule-based methods
            const notebook = Generator.generateNotebook(articleText);

            // Save to storage
            Storage.saveNotebook(notebook);

            // Display notebook
            UI.displayNotebook(notebook);

            // Refresh notebooks list
            this.loadNotebooksList();

            // Clear input
            articleInput.value = '';

            // Hide loading
            UI.hideLoading();

            UI.showToast('Notebook generated (offline mode)');
        } catch (error) {
            console.error('Error processing article:', error);
            UI.hideLoading();
            UI.showToast('Error processing article. Please try again.');
        }
    },

    /**
     * Fetch article from URL and process it with AI
     */
    async fetchFromURL() {
        const urlInput = document.getElementById('articleUrl');
        const url = urlInput.value.trim();

        if (!url) {
            UI.showToast('Please enter a valid URL');
            return;
        }

        if (!Fetcher.isValidUrl(url)) {
            UI.showToast('Invalid URL format. Please include http:// or https://');
            return;
        }

        try {
            // Show loading state
            UI.showLoading();
            UI.updateLoadingMessage('🌐 Fetching article from URL...');

            // Fetch the article content using serverless function
            const result = await Fetcher.fetchArticle(url);

            if (result.success && result.content) {
                // Success - generate notebook from fetched content
                UI.updateLoadingMessage('🤖 AI is generating notebook from fetched content...');
                await this.generateNotebookFromText(result.content, result.title);
                return;
            }

            // Failed to fetch directly - try AI-based extraction as fallback
            if (result.canUseAIFallback || !result.success) {
                UI.updateLoadingMessage('🤖 Direct fetch failed. Using AI to extract content...');
                
                // Create a minimal prompt for AI to help extract/generate from URL description
                const urlContext = `The user wants to analyze this news article: ${url}\n\nTitle: ${result.title || 'Unknown'}\n\nNote: The system could not directly access the article content. Please ask the user to paste the article text manually.`;
                
                UI.hideLoading();
                UI.showToast(result.suggestion || 'Could not fetch article. Please paste the text manually.');
                
                // Pre-fill textarea with suggestion
                document.getElementById('articleInput').value = urlContext;
                return;
            }

            if (!result.content || result.content.length < 50) {
                throw new Error('Could not extract sufficient content from URL');
            }

        } catch (error) {
            console.error('Error fetching article:', error);
            UI.hideLoading();
            
            // Provide helpful error message with alternatives
            const errorMsg = `Failed to fetch: ${error.message}. \n\nAlternatives:\n1. Copy-paste the article text directly\n2. Upload a PDF/TXT file with the content\n3. Try a different news source`;
            
            UI.showToast(errorMsg);
            
            // Suggest manual input
            document.getElementById('articleInput').placeholder = `Paste article text from ${url} here...`;
        }
    },

    /**
     * Generate notebook from text content
     */
    async generateNotebookFromText(text, title) {
        try {
            // Put content in textarea for processing
            document.getElementById('articleInput').value = text;
            
            // Process with AI
            await this.processArticle();
            
            // Clear URL input
            document.getElementById('articleUrl').value = '';
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load and display notebooks list in sidebar
     */
    loadNotebooksList() {
        const notebooks = Storage.getSortedNotebooks();
        UI.renderNotebooksList(notebooks);
    },

    /**
     * Delete currently displayed notebook
     */
    deleteCurrentNotebook() {
        if (!UI.currentNotebook) {
            return;
        }

        const confirmed = confirm(
            `Are you sure you want to delete "${UI.currentNotebook.title}"? This action cannot be undone.`
        );

        if (confirmed) {
            try {
                Storage.deleteNotebook(UI.currentNotebook.id);
                
                // Show welcome screen
                UI.showWelcomeScreen();
                
                // Refresh notebooks list
                this.loadNotebooksList();
                
                UI.showToast('Notebook deleted successfully');
            } catch (error) {
                console.error('Error deleting notebook:', error);
                UI.showToast('Error deleting notebook');
            }
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
