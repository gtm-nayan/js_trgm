import { find_distinct_trigrams } from './trigrams.js';

type TrigramSet = ReturnType<typeof find_distinct_trigrams>;

/**
 * Find the similarity between two strings.
 *
 * @param {string} first The first string
 * @param {string} second The second string
 * @returns {number}
 * A number that indicates how similar the two arguments are.
 * The range of the result is `0` (indicating that the two strings are completely dissimilar)
 * to `1` (indicating that the two strings are identical).
 */
export function similarity_between_strings(
	first: string,
	second: string
): number {
	return similarity_between_trigram_sets(
		find_distinct_trigrams(first),
		find_distinct_trigrams(second)
	);
}

/**
 * Find the similarity between two sets of trigrams.
 *
 * @param {Set<string>} first The first set of trigrams
 * @param {Set<string>} second The second set of trigrams
 * @returns {number}
 * A number that indicates how similar the two arguments are.
 * The range of the result is `0` (indicating that the two sets are completely dissimilar)
 * to `1` (indicating that the two sets are identical).
 */
export function similarity_between_trigram_sets(
	first: TrigramSet,
	second: TrigramSet
): number {
	let unique = first.size;
	let shared = 0;

	for (const trigram of second) {
		if (first.has(trigram)) ++shared;
		else ++unique;
	};

	return shared / unique;
}
