<script>
	import { trgm_search, find_distinct_trigrams, similarity } from 'js_trgm';
	import tutorials from './_data.json';

	console.log(find_distinct_trigrams);
	console.log(similarity);

	const search_in = Object.keys(tutorials);
	let value = '';
	let threshold = 0.3;
	let limit = 5;

	$: results = JSON.stringify(trgm_search(value, search_in, { limit, threshold }), null, 4);
</script>

<input type="text" bind:value /> <br />
Limit: <input type="number" bind:value={limit} /><br />
Threshold: <input type="range" bind:value={threshold} min="0" max="1" step="0.1" />
{threshold} <br />
<pre><code>{results}</code></pre>
