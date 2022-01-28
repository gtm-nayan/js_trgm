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
