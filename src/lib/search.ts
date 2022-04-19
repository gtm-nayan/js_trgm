import { similarity_between_trigram_sets } from './similarity.js';
import { find_distinct_trigrams } from './trigrams.js';
import { find_insertion_point, insert_at, truncate } from './utils.js';

/**
 * Use trigrams to search for a match of a string within a collection.
 *
 * @param {string} text The string to match against.
 * @param {Iterable<string>} search_in The iterable collection to search for a match in.
 * @param {SearchOptions} [options] Optional parameters for controlling the results.
 *
 * @returns {Result[]} An array of result objects with the matching
 * string from the collection and its similarity score.
 */
export function trgm_search(
	text: string,
	search_in: Iterable<string>,
	{ limit, threshold = 0.3 }: SearchOptions = {}
): Result[] {
	const results: Result[] = [];
	const text_trigrams = find_distinct_trigrams(text);

	for (const thing of search_in) {
		const score = similarity_between_trigram_sets(
			text_trigrams,
			find_distinct_trigrams(thing)
		);

		if (score > threshold) {
			const value: Result = {
				score,
				target: thing,
			};

			insert_at(
				results,
				find_insertion_point(results, value, (a, b) => b.score - a.score),
				value
			);
			truncate(results, limit);
		}
	}
	return results;
}

export interface Result {
	/**
	 * The similarity of the result string with the search string.
	 */
	score: number;
	/**
	 * The original result string that matched with the search string.
	 */
	target: string;
}

export interface SearchOptions {
	/**
	 * The max number of results to return.
	 */
	limit?: number;
	/**
	 * Only consider a result if the {@link similarity} is above this threshold.
	 * @default 0.3
	 */
	threshold?: number;
}
