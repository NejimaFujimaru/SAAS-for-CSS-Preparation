/**
 * Storage Module
 * localStorage handling for notebook management
 */

const Storage = {
    STORAGE_KEY: 'css_notebooks',

    /**
     * Save notebook to localStorage
     * @param {Object} notebook - Notebook object
     * @returns {boolean} Success status
     */
    saveNotebook(notebook) {
        try {
            const notebooks = this.getAllNotebooks();
            
            // Check if notebook already exists
            const existingIndex = notebooks.findIndex(n => n.id === notebook.id);
            
            if (existingIndex >= 0) {
                notebooks[existingIndex] = notebook;
            } else {
                notebooks.push(notebook);
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notebooks));
            return true;
        } catch (error) {
            console.error('Error saving notebook:', error);
            return false;
        }
    },

    /**
     * Get all notebooks from localStorage
     * @returns {Array} Array of notebooks
     */
    getAllNotebooks() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error retrieving notebooks:', error);
            return [];
        }
    },

    /**
     * Get single notebook by ID
     * @param {string} id - Notebook ID
     * @returns {Object|null} Notebook or null
     */
    getNotebook(id) {
        const notebooks = this.getAllNotebooks();
        return notebooks.find(n => n.id === id) || null;
    },

    /**
     * Delete notebook by ID
     * @param {string} id - Notebook ID
     * @returns {boolean} Success status
     */
    deleteNotebook(id) {
        try {
            let notebooks = this.getAllNotebooks();
            notebooks = notebooks.filter(n => n.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notebooks));
            return true;
        } catch (error) {
            console.error('Error deleting notebook:', error);
            return false;
        }
    },

    /**
     * Update notebook title
     * @param {string} id - Notebook ID
     * @param {string} newTitle - New title
     * @returns {boolean} Success status
     */
    updateTitle(id, newTitle) {
        try {
            const notebooks = this.getAllNotebooks();
            const notebook = notebooks.find(n => n.id === id);
            
            if (notebook) {
                notebook.title = newTitle;
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notebooks));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating title:', error);
            return false;
        }
    },

    /**
     * Search notebooks by query
     * @param {string} query - Search query
     * @returns {Array} Matching notebooks
     */
    searchNotebooks(query) {
        const notebooks = this.getAllNotebooks();
        const lowerQuery = query.toLowerCase();
        
        return notebooks.filter(n => 
            n.title.toLowerCase().includes(lowerQuery) ||
            n.cleanedText.toLowerCase().includes(lowerQuery)
        );
    },

    /**
     * Get notebooks sorted by date
     * @param {string} order - 'asc' or 'desc'
     * @returns {Array} Sorted notebooks
     */
    getSortedNotebooks(order = 'desc') {
        const notebooks = this.getAllNotebooks();
        
        return notebooks.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            
            return order === 'desc' ? dateB - dateA : dateA - dateB;
        });
    },

    /**
     * Clear all notebooks
     * @returns {boolean} Success status
     */
    clearAll() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    },

    /**
     * Export all data as JSON
     * @returns {string} JSON string
     */
    exportData() {
        return JSON.stringify(this.getAllNotebooks(), null, 2);
    },

    /**
     * Import data from JSON
     * @param {string} jsonData - JSON string
     * @returns {boolean} Success status
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (Array.isArray(data)) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    },

    /**
     * Get storage statistics
     * @returns {Object} Stats object
     */
    getStats() {
        const notebooks = this.getAllNotebooks();
        const totalSize = new Blob([localStorage.getItem(this.STORAGE_KEY) || '']).size;
        
        return {
            count: notebooks.length,
            size: totalSize,
            sizeFormatted: this.formatBytes(totalSize),
            oldest: notebooks.length > 0 ? notebooks[notebooks.length - 1].createdAt : null,
            newest: notebooks.length > 0 ? notebooks[0].createdAt : null
        };
    },

    /**
     * Format bytes to human readable
     * @param {number} bytes - Bytes count
     * @returns {string} Formatted string
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
