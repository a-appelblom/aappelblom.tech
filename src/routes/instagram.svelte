<script context="module" lang="ts">
	// export async function load({ params, fetch, session, stuff }) {
	// 	return {
	// 		status: response.status,
	// 		props: {
	// 			posts: response.ok && data.data,
	// 			paging: response.ok && data.paging
	// 		}
	// 	};
	// }
</script>

<script>
	export let posts;
	export let paging;

	console.log(paging);
	console.log(posts);
</script>

<h1>Instagram</h1>
{#each posts as post}
	<div class="post">
		<h2>{post.caption}</h2>
		<img src={post.media_url} />
	</div>
{/each}
