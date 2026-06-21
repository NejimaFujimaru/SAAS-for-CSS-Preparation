/**
 * Export Module
 * PDF, Markdown export and copy functionality
 */

const Export = {
    /**
     * Export notebook as PDF (using print dialog)
     * @param {Object} notebook - Notebook object
     */
    exportAsPDF(notebook) {
        // For MVP, we use browser's print to PDF functionality
        window.print();
    },

    /**
     * Export notebook as Markdown
     * @param {Object} notebook - Notebook object
     * @returns {string} Markdown content
     */
    generateMarkdown(notebook) {
        let md = `# ${notebook.title}\n\n`;
        md += `*Generated on: ${new Date(notebook.createdAt).toLocaleDateString()}*\n\n`;
        
        // Classification
        md += `## 📊 CSS Relevance Mapping\n\n`;
        for (const [subject, score] of Object.entries(notebook.classification)) {
            md += `- **${subject}**: ${score}/10\n`;
        }
        md += `\n`;

        // Executive Summary
        md += `## 📋 Executive Summary\n\n`;
        md += `${notebook.summary}\n\n`;

        // Background
        md += `## 📜 Background\n\n`;
        md += `${notebook.background}\n\n`;

        // Key Facts
        md += `## 📌 Key Facts\n\n`;
        notebook.keyFacts.forEach(fact => {
            md += `- ${fact}\n`;
        });
        md += `\n`;

        // Causes
        md += `## 🔍 Causes\n\n`;
        notebook.causes.forEach(cause => {
            md += `- ${cause}\n`;
        });
        md += `\n`;

        // Effects
        md += `## ⚡ Effects & Implications\n\n`;
        md += `**Political:** ${notebook.effects.political}\n\n`;
        md += `**Economic:** ${notebook.effects.economic}\n\n`;
        md += `**Social:** ${notebook.effects.social}\n\n`;
        md += `**International:** ${notebook.effects.international}\n\n`;

        // Pakistan Perspective
        md += `## 🇵🇰 Pakistan Perspective\n\n`;
        md += `${notebook.pakistanPerspective}\n\n`;

        // Stakeholders
        md += `## 👥 Stakeholder Analysis\n\n`;
        notebook.stakeholders.forEach(stakeholder => {
            md += `- ${stakeholder}\n`;
        });
        md += `\n`;

        // Arguments For
        md += `## ✅ Arguments For\n\n`;
        notebook.argumentsFor.forEach(arg => {
            md += `- ${arg}\n`;
        });
        md += `\n`;

        // Arguments Against
        md += `## ❌ Arguments Against\n\n`;
        notebook.argumentsAgainst.forEach(arg => {
            md += `- ${arg}\n`;
        });
        md += `\n`;

        // Recommendations
        md += `## 💡 Policy Recommendations\n\n`;
        notebook.recommendations.forEach(rec => {
            md += `- ${rec}\n`;
        });
        md += `\n`;

        // Essay Material
        md += `## ✍️ Essay Material\n\n`;
        md += `### Thesis Statement\n\n`;
        md += `${notebook.essay.thesis}\n\n`;
        
        md += `### Structured Arguments\n\n`;
        notebook.essay.arguments.forEach((arg, i) => {
            md += `${i + 1}. ${arg}\n`;
        });
        md += `\n`;

        md += `### Counter Argument\n\n`;
        md += `${notebook.essay.counterArgument}\n\n`;

        md += `### Conclusion Outline\n\n`;
        md += `${notebook.essay.conclusion}\n\n`;

        md += `### Suggested Essay Topics\n\n`;
        notebook.essay.topics.forEach(topic => {
            md += `- ${topic}\n`;
        });
        md += `\n`;

        // MCQs
        md += `## ❓ Practice MCQs\n\n`;
        notebook.mcqs.forEach((mcq, i) => {
            md += `**Q${i + 1}:** ${mcq.question}\n\n`;
            mcq.options.forEach((opt, j) => {
                md += `${String.fromCharCode(65 + j)}. ${opt}\n`;
            });
            md += `\n*Answer: ${mcq.correct}*\n\n`;
            md += `*Explanation: ${mcq.explanation}*\n\n`;
        });

        // Vocabulary
        md += `## 📖 Vocabulary Intelligence\n\n`;
        notebook.vocabulary.forEach(vocab => {
            md += `### ${vocab.word}\n\n`;
            md += `**Part of Speech:** ${vocab.pos}\n\n`;
            md += `**Meaning:** ${vocab.meaning}\n\n`;
            md += `**Urdu:** ${vocab.urdu}\n\n`;
            md += `**Synonyms:** ${vocab.synonyms.join(', ')}\n\n`;
            if (vocab.antonyms.length > 0) {
                md += `**Antonyms:** ${vocab.antonyms.join(', ')}\n\n`;
            }
            md += `**Example:** ${vocab.example}\n\n`;
            md += `**CSS Importance:** ${vocab.importance}\n\n`;
        });

        return md;
    },

    /**
     * Download markdown file
     * @param {Object} notebook - Notebook object
     */
    exportAsMarkdown(notebook) {
        const markdown = this.generateMarkdown(notebook);
        this.downloadFile(markdown, `${notebook.title.replace(/[^a-z0-9]/gi, '_')}.md`, 'text/markdown');
    },

    /**
     * Copy all content to clipboard
     * @param {Object} notebook - Notebook object
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard(notebook) {
        try {
            const markdown = this.generateMarkdown(notebook);
            await navigator.clipboard.writeText(markdown);
            return true;
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            
            // Fallback for older browsers
            try {
                const textarea = document.createElement('textarea');
                textarea.value = this.generateMarkdown(notebook);
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (fallbackError) {
                console.error('Fallback copy failed:', fallbackError);
                return false;
            }
        }
    },

    /**
     * Download file helper
     * @param {string} content - File content
     * @param {string} filename - File name
     * @param {string} mimeType - MIME type
     */
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    },

    /**
     * Export notebook as JSON
     * @param {Object} notebook - Notebook object
     */
    exportAsJSON(notebook) {
        const json = JSON.stringify(notebook, null, 2);
        this.downloadFile(json, `${notebook.title.replace(/[^a-z0-9]/gi, '_')}.json`, 'application/json');
    },

    /**
     * Create printable version
     * @param {Object} notebook - Notebook object
     */
    preparePrintVersion(notebook) {
        // Add print-specific classes
        document.body.classList.add('print-mode');
        
        // Ensure all sections are expanded
        const collapsedSections = document.querySelectorAll('.notebook-section.collapsed');
        collapsedSections.forEach(section => {
            section.classList.remove('collapsed');
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Export;
}
