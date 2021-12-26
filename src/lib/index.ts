import sortedLastIndexBy from 'lodash-es/sortedLastIndexBy.js';

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
		.split(/\W+/)
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
export function similarity(first: string, second: string): number {
	const tr1 = find_distinct_trigrams(first);
	const tr2 = find_distinct_trigrams(second);

	let unique = tr1.size;
	let shared = 0;

	for (const trigram of tr2) {
		tr1.has(trigram) ? ++shared : ++unique;
	}

	return shared / unique;
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

	for (const thing of search_in) {
		const score = similarity(text, thing);

		if (score > threshold) {
			const value: Result = {
				score,
				target: thing,
			};

			insert_at(
				results,
				sortedLastIndexBy(results, value, (v) => -v.score),
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

/**
 * Insert a value into an array at the specified index.
 *
 * @param {Array<T>} arr The array to insert the value into.
 * @param {number} index The index to insert the value at.
 * @param {T} to_insert The value to insert.
 */
function insert_at<T>(arr: T[], index: number, to_insert: T): void {
	arr.splice(index, 0, to_insert);
}

/**
 * Truncate an array in place.
 *
 * @param {Array<T>} arr The array to truncate.
 * @param {number} [limit] The number of items to truncate the array to.
 */
function truncate<T>(arr: T[], limit: number = arr.length): void {
	arr.splice(limit, arr.length - limit);
}
