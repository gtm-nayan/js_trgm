/**
 * Find the unique trigrams in a string.
 *
 * @param {string} text - The string to find the trigrams in.
 *
 * @returns {Set<string>} A `Set` of the trigrams.
 */
export function find_distinct_trigrams(text: string): Set<string> {
	const trigrams = new Set<string>();
	text
		.toLowerCase()
		.split(/[^a-z]+/)
		.forEach((word) => {
			if (word.length) {
				const padded = `  ${word} `;
				for (let i = 3; i <= padded.length; ++i) {
					trigrams.add(padded.slice(i - 3, i));
				}
			}
		});
	return trigrams;
}
