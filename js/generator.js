/**
 * Generator Module
 * Content generation logic for CSS notebook creation
 */

const Generator = {
    /**
     * Generate complete notebook from article text
     * @param {string} articleText - Raw article text
     * @returns {Object} Complete notebook object
     */
    generateNotebook(articleText) {
        const cleanedText = this.cleanText(articleText);
        
        return {
            id: this.generateId(),
            title: this.extractTitle(cleanedText),
            createdAt: new Date().toISOString(),
            rawText: articleText,
            cleanedText: cleanedText,
            classification: Classifier.getCSSRelevanceScores(cleanedText),
            summary: this.generateSummary(cleanedText),
            background: this.generateBackground(cleanedText),
            keyFacts: this.extractKeyFacts(cleanedText),
            causes: this.generateCauses(cleanedText),
            effects: this.generateEffects(cleanedText),
            pakistanPerspective: this.generatePakistanPerspective(cleanedText),
            stakeholders: this.extractStakeholders(cleanedText),
            argumentsFor: this.generateArgumentsFor(cleanedText),
            argumentsAgainst: this.generateArgumentsAgainst(cleanedText),
            recommendations: this.generateRecommendations(cleanedText),
            essay: this.generateEssayMaterial(cleanedText),
            mcqs: this.generateMCQs(cleanedText),
            vocabulary: Vocabulary.extractWords(cleanedText)
        };
    },

    /**
     * Clean and normalize article text
     * @param {string} text - Raw text
     * @returns {string} Cleaned text
     */
    cleanText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/\n+/g, '\n')
            .trim();
    },

    /**
     * Generate unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return 'notebook_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Extract or generate title from text
     * @param {string} text - Article text
     * @returns {string} Title
     */
    extractTitle(text) {
        // Try to get first sentence as title
        const firstSentence = text.split('.')[0].trim();
        
        if (firstSentence.length > 10 && firstSentence.length < 100) {
            return firstSentence;
        }

        // Fallback: generate from keywords
        const primaryCategory = Classifier.getPrimaryCategory(text);
        return `${primaryCategory.category} Issue - ${new Date().toLocaleDateString()}`;
    },

    /**
     * Generate executive summary
     * @param {string} text - Article text
     * @returns {string} Summary paragraph
     */
    generateSummary(text) {
        const sentences = text.split('.').filter(s => s.trim().length > 20);
        
        // Take first 3-4 sentences as summary
        const summarySentences = sentences.slice(0, Math.min(4, sentences.length));
        
        let summary = summarySentences.join('. ').trim();
        
        if (!summary.endsWith('.')) {
            summary += '.';
        }

        // Ensure minimum length
        if (summary.length < 150) {
            summary = `This article discusses important developments related to ${Classifier.getPrimaryCategory(text).category.toLowerCase()}. ${summary}`;
        }

        return summary;
    },

    /**
     * Generate background section
     * @param {string} text - Article text
     * @returns {string} Background context
     */
    generateBackground(text) {
        const primaryCategory = Classifier.getPrimaryCategory(text);
        
        return `The issue discussed in this article has significant implications for ${primaryCategory.category.toLowerCase()}. Understanding the historical context and recent developments is crucial for CSS aspirants. The situation has evolved over time, with various factors contributing to its current state. This background provides the foundation for analyzing the broader implications and potential solutions.`;
    },

    /**
     * Extract key facts from text
     * @param {string} text - Article text
     * @returns {Array} Array of key facts
     */
    extractKeyFacts(text) {
        const facts = [];
        const sentences = text.split('.');

        // Extract sentences with numbers, dates, or names
        sentences.forEach(sentence => {
            const trimmed = sentence.trim();
            if (trimmed.length > 30 && trimmed.length < 200) {
                // Check for numbers, dates, or proper nouns
                if (/\d{4}/.test(trimmed) || /[A-Z][a-z]+ [A-Z]/.test(trimmed)) {
                    facts.push(trimmed + '.');
                }
            }
        });

        // If not enough facts found, generate generic ones
        while (facts.length < 5) {
            const primaryCategory = Classifier.getPrimaryCategory(text);
            facts.push(`Key development in ${primaryCategory.category.toLowerCase()} sector`);
        }

        return facts.slice(0, 8);
    },

    /**
     * Generate causes section
     * @param {string} text - Article text
     * @returns {Array} Array of causes
     */
    generateCauses(text) {
        const causes = [
            'Historical policy decisions and their long-term impact',
            'Economic constraints and resource limitations',
            'Political dynamics and governance challenges',
            'Social and demographic factors',
            'International influences and global trends'
        ];

        // Customize based on content
        const classifications = Classifier.classify(text);
        if (classifications.some(c => c.category === 'Economy')) {
            causes.unshift('Economic instability and fiscal pressures');
        }

        return causes.slice(0, 5);
    },

    /**
     * Generate effects/implications section
     * @param {string} text - Article text
     * @returns {Object} Effects by category
     */
    generateEffects(text) {
        return {
            political: 'Political ramifications include shifts in policy priorities and public discourse.',
            economic: 'Economic implications involve potential impacts on growth, employment, and fiscal stability.',
            social: 'Social consequences affect various segments of society, particularly vulnerable populations.',
            international: 'International dimensions may influence diplomatic relations and global positioning.'
        };
    },

    /**
     * Generate Pakistan perspective
     * @param {string} text - Article text
     * @returns {string} Pakistan-specific analysis
     */
    generatePakistanPerspective(text) {
        const classifications = Classifier.classify(text);
        const hasPakistan = classifications.some(c => c.category === 'Pakistan Affairs');
        
        if (hasPakistan) {
            return `This issue has direct relevance to Pakistan's national interests. The situation affects Pakistan's domestic policies, international standing, and socio-economic development. Understanding Pakistan's position is essential for CSS examinations.`;
        } else {
            return `While this issue may seem international, it has indirect implications for Pakistan. Pakistani policymakers must consider such developments when formulating foreign policy and domestic strategies. CSS aspirants should analyze how global trends affect Pakistan's national interests.`;
        }
    },

    /**
     * Extract stakeholders from text
     * @param {string} text - Article text
     * @returns {Array} List of stakeholders
     */
    extractStakeholders(text) {
        const stakeholders = [
            'Government institutions and ministries',
            'Civil society organizations',
            'Private sector businesses',
            'Academic and research institutions',
            'International organizations',
            'General public and citizens'
        ];

        // Add specific stakeholders if found in text
        const entities = text.match(/[A-Z][a-z]+ (?:Authority|Commission|Department|Ministry|Organization)/g);
        if (entities) {
            stakeholders.unshift(...entities.slice(0, 3));
        }

        return stakeholders.slice(0, 6);
    },

    /**
     * Generate arguments in favor
     * @param {string} text - Article text
     * @returns {Array} Supporting arguments
     */
    generateArgumentsFor(text) {
        return [
            'Promotes transparency and accountability in governance',
            'Aligns with international best practices',
            'Addresses long-standing structural issues',
            'Potential for positive socio-economic impact',
            'Strengthens institutional capacity'
        ];
    },

    /**
     * Generate arguments against
     * @param {string} text - Article text
     * @returns {Array} Opposing arguments
     */
    generateArgumentsAgainst(text) {
        return [
            'Implementation challenges and resource constraints',
            'Potential short-term disruption',
            'Resistance from vested interests',
            'Risk of unintended consequences',
            'Need for careful calibration and monitoring'
        ];
    },

    /**
     * Generate policy recommendations
     * @param {string} text - Article text
     * @returns {Array} Recommendations
     */
    generateRecommendations(text) {
        return [
            'Develop comprehensive policy framework with clear timelines',
            'Ensure stakeholder consultation and buy-in',
            'Allocate adequate resources for implementation',
            'Establish monitoring and evaluation mechanisms',
            'Learn from international best practices',
            'Build institutional capacity through training',
            'Promote public awareness and engagement'
        ];
    },

    /**
     * Generate essay material
     * @param {string} text - Article text
     * @returns {Object} Essay components
     */
    generateEssayMaterial(text) {
        const title = this.extractTitle(text);
        const primaryCategory = Classifier.getPrimaryCategory(text);

        return {
            thesis: `This essay argues that ${title.toLowerCase()} requires comprehensive analysis and strategic intervention to address its multifaceted dimensions effectively.`,
            
            arguments: [
                `Historical context and evolution of the issue`,
                `Current situation and key challenges`,
                `Impact on ${primaryCategory.category.toLowerCase()} sector`,
                `Comparative analysis with international examples`,
                `Strategic recommendations for sustainable solutions`
            ],
            
            counterArgument: `Critics may argue that the proposed solutions are impractical given resource constraints and political realities. However, evidence suggests that incremental reforms can yield significant results over time.`,
            
            conclusion: `In conclusion, addressing this issue demands a multi-pronged approach involving all stakeholders. The way forward lies in balanced policies that consider both immediate needs and long-term sustainability.`,
            
            topics: [
                `${title}: Challenges and Opportunities`,
                `The Way Forward: Strategic Solutions for ${primaryCategory.category}`,
                `Impact Analysis: ${primaryCategory.category} in Contemporary Context`,
                `From Problem to Progress: A Roadmap for Reform`,
                `Global Perspectives on ${primaryCategory.category}: Lessons for Pakistan`
            ]
        };
    },

    /**
     * Generate MCQs from article
     * @param {string} text - Article text
     * @returns {Array} MCQ objects
     */
    generateMCQs(text) {
        const mcqs = [];
        const keyFacts = this.extractKeyFacts(text);
        const primaryCategory = Classifier.getPrimaryCategory(text);

        // Generate fact-based MCQs
        keyFacts.slice(0, 5).forEach((fact, index) => {
            mcqs.push({
                question: `What is a key aspect of the issue discussed?`,
                options: [
                    fact,
                    `Unrelated option ${index + 1}`,
                    `Incorrect statement ${index + 1}`,
                    `False claim ${index + 1}`
                ].sort(() => 0.5 - Math.random()),
                correct: fact,
                explanation: `This fact is directly mentioned in the article and represents a key point.`
            });
        });

        // Add category-specific MCQs
        mcqs.push({
            question: `Which CSS subject is most relevant to this article?`,
            options: [
                primaryCategory.category,
                'General Science',
                'Mathematics',
                'Literature'
            ],
            correct: primaryCategory.category,
            explanation: `The article primarily deals with ${primaryCategory.category.toLowerCase()} based on keyword analysis.`
        });

        return mcqs.slice(0, 10);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Generator;
}
