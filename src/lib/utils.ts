/**
 * Insert a value into an array at the specified index.
 *
 * @param {Array<T>} arr The array to insert the value into.
 * @param {number} index The index to insert the value at.
 * @param {T} to_insert The value to insert.
 */
export function insert_at<T>(arr: T[], index: number, to_insert: T): void {
	arr.splice(index, 0, to_insert);
}

/**
 * Truncate an array in place.
 *
 * @param {Array<T>} arr The array to truncate.
 * @param {number} [limit] The number of items to truncate the array to.
 */
export function truncate<T>(arr: T[], limit: number = arr.length): void {
	arr.splice(limit, arr.length - limit);
}

export function find_insertion_point<T>(
	arr: T[],
	item: T,
	compare: (a: T, b: T) => number
): number {
	return i_binary_search(arr, item, 0, arr.length - 1);

	function i_binary_search(
		arr: T[],
		item: T,
		begin: number,
		end: number
	): number {
		if (begin > end) return begin;
		else {
			const mid = Math.floor((begin + end) / 2);
			const cmp = compare(item, arr[mid]);
			if (cmp < 0) return i_binary_search(arr, item, begin, mid - 1);
			else if (cmp > 0) return i_binary_search(arr, item, mid + 1, end);
			else return mid;
		}
	}
}
