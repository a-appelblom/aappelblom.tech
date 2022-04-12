<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	if (browser) {
		if (navigator.language.includes('en')) {
			goto('/en');
		} else {
			goto('/sv');
		}
	}
</script>
