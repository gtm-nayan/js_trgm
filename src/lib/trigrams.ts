/**
 * Find the unique trigrams in a string.
 *
 * @param {string} text - The string to find the trigrams in.
 *
 * @returns {Set<string>} A `Set` of the trigrams.
 */
export function find_distinct_trigrams(text: string): Set<string> {
	const words = text
		.toLowerCase()
		.split(/[^a-z]+/)
		.filter((w) => w.length)
		.map((w) => `  ${w} `);

	const trigrams = new Set<string>();

	for (const word of words) {
		for (let i = 3; i <= word.length; ++i) {
			trigrams.add(word.slice(i - 3, i));
		}
	}

	return trigrams;
}
