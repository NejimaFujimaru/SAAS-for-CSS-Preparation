/**
 * UI Module
 * Rendering system and UI interactions
 */

const UI = {
    currentNotebook: null,

    /**
     * Initialize UI components
     */
    init() {
        this.setupThemeToggle();
        this.setupSearch();
        this.setupExportModal();
    },

    /**
     * Setup theme toggle functionality
     */
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('.icon');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    },

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchInput = document.getElementById('searchNotebooks');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length > 0) {
                const results = Storage.searchNotebooks(query);
                this.renderNotebooksList(results);
            } else {
                this.renderNotebooksList(Storage.getSortedNotebooks());
            }
        });
    },

    /**
     * Setup export modal
     */
    setupExportModal() {
        const exportBtn = document.getElementById('exportBtn');
        const exportModal = document.getElementById('exportModal');
        const closeBtn = document.getElementById('closeExportModal');
        const exportPDF = document.getElementById('exportPDF');
        const exportMarkdown = document.getElementById('exportMarkdown');
        const copyContent = document.getElementById('copyContent');

        exportBtn.addEventListener('click', () => {
            if (this.currentNotebook) {
                exportModal.classList.remove('hidden');
            }
        });

        closeBtn.addEventListener('click', () => {
            exportModal.classList.add('hidden');
        });

        exportModal.addEventListener('click', (e) => {
            if (e.target === exportModal) {
                exportModal.classList.add('hidden');
            }
        });

        exportPDF.addEventListener('click', () => {
            if (this.currentNotebook) {
                Export.exportAsPDF(this.currentNotebook);
                exportModal.classList.add('hidden');
            }
        });

        exportMarkdown.addEventListener('click', () => {
            if (this.currentNotebook) {
                Export.exportAsMarkdown(this.currentNotebook);
                exportModal.classList.add('hidden');
            }
        });

        copyContent.addEventListener('click', async () => {
            if (this.currentNotebook) {
                const success = await Export.copyToClipboard(this.currentNotebook);
                
                if (success) {
                    this.showToast('Content copied to clipboard!');
                } else {
                    this.showToast('Failed to copy content');
                }
                
                exportModal.classList.add('hidden');
            }
        });
    },

    /**
     * Show loading overlay
     */
    showLoading() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    },

    /**
     * Hide loading overlay
     */
    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
        // Reset loading message for next time
        const loadingMessage = document.querySelector('#loadingOverlay p');
        if (loadingMessage) {
            loadingMessage.textContent = 'Processing article...';
        }
    },

    /**
     * Update loading message
     * @param {string} message - New loading message
     */
    updateLoadingMessage(message) {
        const loadingMessage = document.querySelector('#loadingOverlay p');
        if (loadingMessage) {
            loadingMessage.textContent = message;
        }
    },

    /**
     * Show welcome screen
     */
    showWelcomeScreen() {
        document.getElementById('welcomeScreen').classList.remove('hidden');
        document.getElementById('notebookView').classList.add('hidden');
        this.currentNotebook = null;
    },

    /**
     * Display notebook
     * @param {Object} notebook - Notebook object
     */
    displayNotebook(notebook) {
        this.currentNotebook = notebook;
        
        document.getElementById('welcomeScreen').classList.add('hidden');
        document.getElementById('notebookView').classList.remove('hidden');

        // Set title
        document.getElementById('notebookTitle').textContent = notebook.title;

        // Render classification scores
        this.renderClassificationScores(notebook.classification);

        // Render content sections
        document.getElementById('executiveSummary').textContent = notebook.summary;
        document.getElementById('backgroundContent').textContent = notebook.background;

        // Render lists
        this.renderList('keyFactsList', notebook.keyFacts);
        this.renderList('causesList', notebook.causes);
        this.renderList('stakeholdersList', notebook.stakeholders);
        this.renderList('argumentsForList', notebook.argumentsFor);
        this.renderList('argumentsAgainstList', notebook.argumentsAgainst);
        this.renderList('recommendationsList', notebook.recommendations);

        // Render effects
        const effectsContent = document.getElementById('effectsContent');
        effectsContent.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                <div>
                    <strong style="color: var(--text-secondary);">Political:</strong>
                    <p style="margin-top: 0.5rem;">${notebook.effects.political}</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary);">Economic:</strong>
                    <p style="margin-top: 0.5rem;">${notebook.effects.economic}</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary);">Social:</strong>
                    <p style="margin-top: 0.5rem;">${notebook.effects.social}</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary);">International:</strong>
                    <p style="margin-top: 0.5rem;">${notebook.effects.international}</p>
                </div>
            </div>
        `;

        // Render Pakistan perspective
        document.getElementById('pakistanPerspective').textContent = notebook.pakistanPerspective;

        // Render essay material
        document.getElementById('essayThesis').textContent = notebook.essay.thesis;
        this.renderOrderedList('essayArgumentsList', notebook.essay.arguments);
        document.getElementById('essayCounterArgument').textContent = notebook.essay.counterArgument;
        document.getElementById('essayConclusion').textContent = notebook.essay.conclusion;
        this.renderList('essayTopicsList', notebook.essay.topics);

        // Render MCQs
        this.renderMCQs(notebook.mcqs);

        // Render vocabulary
        this.renderVocabulary(notebook.vocabulary);

        // Render high-value words
        const highValueWords = Vocabulary.getHighValueWords(notebook.vocabulary);
        this.renderList('highValueWordsList', highValueWords.map(w => `${w.word} - ${w.meaning}`));

        // Render sentence exercises
        this.renderSentenceExercises(notebook.vocabulary);

        // Scroll to top
        window.scrollTo(0, 0);
    },

    /**
     * Render classification scores
     * @param {Object} scores - Classification scores
     */
    renderClassificationScores(scores) {
        const container = document.getElementById('classificationScores');
        container.innerHTML = '';

        for (const [subject, score] of Object.entries(scores)) {
            const percentage = score * 10;
            
            const scoreItem = document.createElement('div');
            scoreItem.className = 'score-item';
            scoreItem.innerHTML = `
                <div class="score-label">${subject}</div>
                <div class="score-value">${score}/10</div>
                <div class="score-bar">
                    <div class="score-bar-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            
            container.appendChild(scoreItem);
        }
    },

    /**
     * Render a list
     * @param {string} elementId - Target element ID
     * @param {Array} items - Items to render
     */
    renderList(elementId, items) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            container.appendChild(li);
        });
    },

    /**
     * Render ordered list
     * @param {string} elementId - Target element ID
     * @param {Array} items - Items to render
     */
    renderOrderedList(elementId, items) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            container.appendChild(li);
        });
    },

    /**
     * Render MCQs
     * @param {Array} mcqs - MCQ array
     */
    renderMCQs(mcqs) {
        const container = document.getElementById('mcqsContainer');
        container.innerHTML = '';

        mcqs.forEach((mcq, index) => {
            const mcqElement = document.createElement('div');
            mcqElement.className = 'mcq-item';
            
            let optionsHTML = '';
            mcq.options.forEach(option => {
                optionsHTML += `<div class="mcq-option" data-correct="${option === mcq.correct}">${option}</div>`;
            });

            mcqElement.innerHTML = `
                <div class="mcq-question">Q${index + 1}: ${mcq.question}</div>
                <div class="mcq-options">${optionsHTML}</div>
                <div class="mcq-explanation hidden">💡 ${mcq.explanation}</div>
            `;

            // Add click handlers
            const options = mcqElement.querySelectorAll('.mcq-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const isCorrect = option.dataset.correct === 'true';
                    
                    options.forEach(opt => {
                        opt.classList.remove('correct', 'incorrect');
                        if (opt.dataset.correct === 'true') {
                            opt.classList.add('correct');
                        }
                    });

                    if (!isCorrect) {
                        option.classList.add('incorrect');
                    }

                    // Show explanation
                    mcqElement.querySelector('.mcq-explanation').classList.remove('hidden');
                });
            });

            container.appendChild(mcqElement);
        });
    },

    /**
     * Render vocabulary cards
     * @param {Array} vocabulary - Vocabulary array
     */
    renderVocabulary(vocabulary) {
        const container = document.getElementById('vocabularyContainer');
        container.innerHTML = '';

        vocabulary.forEach(item => {
            const card = document.createElement('div');
            card.className = 'vocab-card';
            
            const antonymsHTML = item.antonyms.length > 0 
                ? `<div class="vocab-antonyms"><strong>Antonyms:</strong> ${item.antonyms.join(', ')}</div>` 
                : '';

            card.innerHTML = `
                <div class="vocab-word">${item.word}</div>
                <div class="vocab-pos">${item.pos}</div>
                <div class="vocab-meaning">${item.meaning}</div>
                <div class="vocab-urdu">${item.urdu}</div>
                <div class="vocab-synonyms"><strong>Synonyms:</strong> ${item.synonyms.join(', ')}</div>
                ${antonymsHTML}
                <div class="vocab-example">"${item.example}"</div>
                <span class="vocab-importance importance-${item.importance.toLowerCase()}">${item.importance} Priority</span>
            `;

            container.appendChild(card);
        });
    },

    /**
     * Render sentence completion exercises
     * @param {Array} vocabulary - Vocabulary array
     */
    renderSentenceExercises(vocabulary) {
        const container = document.getElementById('sentenceExercisesContainer');
        const exercises = Vocabulary.generateSentenceExercises(vocabulary);
        
        container.innerHTML = '';

        exercises.forEach((exercise, index) => {
            const exerciseElement = document.createElement('div');
            exerciseElement.style.marginBottom = '1rem';
            exerciseElement.innerHTML = `
                <p style="margin-bottom: 0.5rem;"><strong>Exercise ${index + 1}:</strong> ${exercise.question}</p>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${exercise.options.map(opt => 
                        `<button class="btn-secondary vocab-option" data-answer="${opt === exercise.answer}">${opt}</button>`
                    ).join('')}
                </div>
                <div class="exercise-feedback hidden" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: var(--radius-sm);"></div>
            `;

            // Add click handlers
            const buttons = exerciseElement.querySelectorAll('.vocab-option');
            const feedback = exerciseElement.querySelector('.exercise-feedback');
            
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const isCorrect = button.dataset.answer === 'true';
                    
                    buttons.forEach(btn => btn.disabled = true);
                    
                    if (isCorrect) {
                        button.style.backgroundColor = 'var(--success-color)';
                        button.style.color = 'white';
                        feedback.textContent = '✅ Correct!';
                        feedback.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                        feedback.style.color = 'var(--success-color)';
                    } else {
                        button.style.backgroundColor = 'var(--danger-color)';
                        button.style.color = 'white';
                        feedback.textContent = `❌ Incorrect. The answer is "${exercise.answer}"`;
                        feedback.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        feedback.style.color = 'var(--danger-color)';
                    }
                    
                    feedback.classList.remove('hidden');
                });
            });

            container.appendChild(exerciseElement);
        });
    },

    /**
     * Render notebooks list in sidebar
     * @param {Array} notebooks - Notebooks array
     */
    renderNotebooksList(notebooks) {
        const container = document.getElementById('notebooksList');
        container.innerHTML = '';

        if (notebooks.length === 0) {
            container.innerHTML = '<p style="color: var(--text-tertiary); font-size: 0.875rem;">No notebooks found</p>';
            return;
        }

        notebooks.forEach(notebook => {
            const item = document.createElement('div');
            item.className = 'notebook-item';
            if (this.currentNotebook && this.currentNotebook.id === notebook.id) {
                item.classList.add('active');
            }

            const date = new Date(notebook.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            item.innerHTML = `
                <div class="notebook-item-title">${notebook.title}</div>
                <div class="notebook-item-date">${date}</div>
            `;

            item.addEventListener('click', () => {
                this.displayNotebook(notebook);
                this.updateActiveNotebookItem(notebook.id);
            });

            container.appendChild(item);
        });
    },

    /**
     * Update active notebook item in list
     * @param {string} notebookId - Active notebook ID
     */
    updateActiveNotebookItem(notebookId) {
        const items = document.querySelectorAll('.notebook-item');
        items.forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = Array.from(items).find(item => 
            item.querySelector('.notebook-item-title').textContent === 
            this.currentNotebook?.title
        );

        if (activeItem) {
            activeItem.classList.add('active');
        }
    },

    /**
     * Show toast notification
     * @param {string} message - Message to display
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
