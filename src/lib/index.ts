import sortedLastIndexBy from 'lodash-es/sortedLastIndexBy';

export function find_trigrams(text: string): Set<string> {
	const words = text
		.toLowerCase()
		.split(/\W+/)
		.map((w) => `  ${w} `);
	const trigrams = new Set<string>();
	for (const word of words) {
		for (let i = 3; i <= word.length; ++i) {
			trigrams.add(word.slice(i - 3, i));
		}
	}
	return trigrams;
}

export function similarity(text1: string, text2: string): number {
	const tr1 = find_trigrams(text1);
	const tr2 = find_trigrams(text2);

	let unique = tr1.size;
	let shared = 0;
	for (const trigram of tr2) {
		tr1.has(trigram) ? ++shared : ++unique;
	}

	return shared / unique;
}

export function trgmSearch(
	text: string,
	search_in: Iterable<string>,
	{
		limit,
		threshold = 0.3
	}: {
		limit?: number;
		threshold?: number;
	} = {}
): Result[] {
	const results: Result[] = [];
	for (const thing of search_in) {
		const score = similarity(text, thing);
		if (score > threshold) {
			const value: Result = {
				score,
				target: thing
			};
			insert_at(results, sortedLastIndexBy(results, value, (v) => -v.score), value, limit);
		}
	}
	return results;
}

export interface Result {
	score: number;
	target: string;
}

function insert_at<T>(
	arr: Array<T>,
	index: number,
	to_insert: T,
	limit: number = arr.length + 1
): void {
	arr.splice(index, 0, to_insert);
	arr.splice(limit, arr.length - limit);
}
