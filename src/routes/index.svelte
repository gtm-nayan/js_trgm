<script>
	import { trgm_search, find_distinct_trigrams, similarity } from 'js_trgm';
	import tutorials from './_data.json';

	console.log(find_distinct_trigrams);
	console.log(similarity);

	const search_in = Object.keys(tutorials);
	let value = '';

	$: results = JSON.stringify(trgm_search(value, search_in, { limit: 1, threshold: 0.4 }), null, 4);
</script>

<input type="text" bind:value />
<pre><code>{results}</code></pre>
