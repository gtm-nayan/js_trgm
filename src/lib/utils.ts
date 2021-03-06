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

/**
 * Returns the highest index at which a value can be inserted into a sorted array
 */
export function find_insertion_point<T>(
	arr: T[],
	item: T,
	key: (item: T) => number
): number {
	let low = 0;
	let high = arr.length;
	const item_val = key(item);
	
	while (low < high) {
		const mid = (low + high) >>> 1;

		if (key(arr[mid]) <= item_val) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}
	return high;
}
