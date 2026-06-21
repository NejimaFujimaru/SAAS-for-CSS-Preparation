/**
 * Classifier Module
 * Rule-based keyword classification system for CSS exam categories
 */

const Classifier = {
    // Category keywords with weights
    categories: {
        'Current Affairs': {
            keywords: ['government', 'policy', 'election', 'minister', 'parliament', 'assembly', 'political', 'decision', 'announcement', 'reform', 'crisis', 'summit', 'conference'],
            weight: 1.0
        },
        'Pakistan Affairs': {
            keywords: ['pakistan', 'punjab', 'sindh', 'balochistan', 'kpk', 'islamabad', 'karachi', 'lahore', 'peshawar', 'quetta', 'pakistani', 'national', 'federal'],
            weight: 1.2
        },
        'Economy': {
            keywords: ['economy', 'economic', 'gdp', 'inflation', 'budget', 'finance', 'trade', 'export', 'import', 'currency', 'rupee', 'dollar', 'imf', 'loan', 'investment', 'market', 'business', 'industry', 'tax', 'revenue'],
            weight: 1.1
        },
        'Governance': {
            keywords: ['governance', 'administration', 'bureaucracy', 'civil service', 'institution', 'accountability', 'transparency', 'corruption', 'reform', 'efficiency', 'public sector', 'delivery'],
            weight: 1.0
        },
        'Security': {
            keywords: ['security', 'military', 'army', 'defense', 'terrorism', 'terrorist', 'attack', 'conflict', 'war', 'peace', 'border', 'intelligence', 'police', 'law enforcement'],
            weight: 1.0
        },
        'Environment': {
            keywords: ['environment', 'climate', 'pollution', 'global warming', 'carbon', 'emission', 'renewable', 'sustainable', 'green', 'ecology', 'conservation', 'deforestation', 'biodiversity'],
            weight: 1.0
        },
        'Energy': {
            keywords: ['energy', 'electricity', 'power', 'oil', 'gas', 'coal', 'nuclear', 'solar', 'wind', 'fuel', 'petroleum', 'grid', 'generation', 'consumption'],
            weight: 1.0
        },
        'Science & Technology': {
            keywords: ['technology', 'science', 'digital', 'innovation', 'ai', 'artificial intelligence', 'machine learning', 'internet', 'software', 'hardware', 'research', 'development', 'scientific', 'tech', 'startup'],
            weight: 1.1
        },
        'Education': {
            keywords: ['education', 'school', 'university', 'college', 'student', 'teacher', 'curriculum', 'learning', 'academic', 'literacy', 'exam', 'degree', 'scholarship'],
            weight: 1.0
        },
        'Health': {
            keywords: ['health', 'medical', 'hospital', 'doctor', 'disease', 'vaccine', 'healthcare', 'medicine', 'patient', 'treatment', 'epidemic', 'pandemic', 'wellness'],
            weight: 1.0
        },
        'International Relations': {
            keywords: ['international', 'foreign', 'diplomatic', 'diplomacy', 'ambassador', 'treaty', 'agreement', 'un', ' united nations', 'oic', 'saarc', 'bilateral', 'multilateral', 'geopolitical', 'relations'],
            weight: 1.1
        }
    },

    /**
     * Classify text into CSS exam categories
     * @param {string} text - Input article text
     * @returns {Array} Array of category scores sorted by confidence
     */
    classify(text) {
        const lowerText = text.toLowerCase();
        const results = [];

        for (const [category, config] of Object.entries(this.categories)) {
            let score = 0;
            let matchCount = 0;

            config.keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                const matches = lowerText.match(regex);
                if (matches) {
                    score += matches.length * config.weight;
                    matchCount += matches.length;
                }
            });

            // Normalize score to 0-100
            const normalizedScore = Math.min(100, Math.round(score * 2));
            
            if (normalizedScore > 0) {
                results.push({
                    category,
                    score: normalizedScore,
                    matches: matchCount
                });
            }
        }

        // Sort by score descending
        results.sort((a, b) => b.score - a.score);

        return results;
    },

    /**
     * Get primary category for an article
     * @param {string} text - Input article text
     * @returns {Object} Primary category with score
     */
    getPrimaryCategory(text) {
        const results = this.classify(text);
        return results[0] || { category: 'General', score: 50, matches: 0 };
    },

    /**
     * Calculate CSS subject relevance scores (0-10 scale)
     * @param {string} text - Input article text
     * @returns {Object} Scores for each CSS subject
     */
    getCSSRelevanceScores(text) {
        const classifications = this.classify(text);
        
        const scores = {
            'Current Affairs': 0,
            'Pakistan Affairs': 0,
            'International Relations': 0,
            'Economy': 0,
            'Governance': 0,
            'Environment': 0,
            'Science & Technology': 0
        };

        classifications.forEach(({ category, score }) => {
            if (scores.hasOwnProperty(category)) {
                // Convert 0-100 to 0-10 scale
                scores[category] = Math.min(10, Math.round(score / 10));
            }
        });

        return scores;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Classifier;
}
