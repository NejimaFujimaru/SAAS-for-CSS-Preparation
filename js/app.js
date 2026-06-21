/**
 * App Module
 * Main controller and application initialization
 */

const App = {
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

        // Delete notebook button
        const deleteBtn = document.getElementById('deleteNotebookBtn');
        deleteBtn.addEventListener('click', () => this.deleteCurrentNotebook());

        // Allow Ctrl+Enter to process article
        const articleInput = document.getElementById('articleInput');
        articleInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.processArticle();
            }
        });
    },

    /**
     * Process article from input
     */
    async processArticle() {
        const articleInput = document.getElementById('articleInput');
        const articleText = articleInput.value.trim();

        if (!articleText || articleText.length < 50) {
            UI.showToast('Please enter a valid article (at least 50 characters)');
            return;
        }

        try {
            // Show loading state
            UI.showLoading();

            // Simulate processing delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800));

            // Generate notebook
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

            UI.showToast('Notebook generated successfully!');
        } catch (error) {
            console.error('Error processing article:', error);
            UI.hideLoading();
            UI.showToast('Error processing article. Please try again.');
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
