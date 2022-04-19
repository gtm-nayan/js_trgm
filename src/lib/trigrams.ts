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
		.forEach((w) => {
			if (w.length) {
				const s = `  ${w} `;
				for (let i = 3; i <= s.length; ++i) {
					trigrams.add(s.slice(i - 3, i));
				}
			}
		});
	return trigrams;
}
