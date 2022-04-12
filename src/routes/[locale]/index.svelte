<script context="module" lang="ts">
	export async function load({ params: { locale }, fetch, session, stuff }) {
		return { props: { locale } };
	}
</script>

<script lang="ts">
	export let locale;
	export let content;

	if (locale === 'sv') {
		content = {
			disappoint:
				'Ledsen att du inte kan se det här. Men för tillfäller är sidan under konstriktion.',
			progress:
				'Denna sida kommer att utvecklas och byggas på stegvis och kommer att vara trevligare varje vecka',
			findMeAtMujina: 'Under tiden kan du hitta mig på mitt företag ',
			spendTime: 'Där spenderar jag det mesta av min tid just nu',
			needForWork: 'Om u söker mig för arbete ta gärna kontakt på min jobb-email. ',
			private: 'Om du söker mig av privata skäl så kan du nå mig på min privata-email.',
			greeting: 'Ha en riktigt fin dag oavsett!'
		};
	} else {
		content = {
			disappoint: 'Sorry, you can not see this page. But for now it is under construction.',
			progress: 'This page will be developed step by step and will be more enjoyable every week.',
			findMeAtMujina: 'In the mean time you can find me at my company ',
			spendTime: 'I spend most of my time there',
			needForWork: 'If you need me for work. Get in touch at my professional email. ',
			private: 'For private inquiries i can always be reached at my private email ',
			greeting: 'No matter what, have a really nice day!!'
		};
	}
</script>

<svelte:head>
	<title>Anton Appelblom</title>
</svelte:head>

<h1 class="text-3xl text-center my-8">AAppelblom.tech</h1>

<div class="flex flex-col gap-8 text-md sm:text-xl p-8">
	<p class="flex gap-8 items-center justify-between">
		{content.disappoint}
		<img class="h-8 hidden sm:visible" alt="Exclamation mark" src="/exclamationmark.svg" />
	</p>

	<p class="flex gap-8 items-center justify-between">
		{content.progress}
		<img class="h-8 hidden sm:visible" alt="a tree" src="/tree.svg" />
	</p>

	<p class="flex flex-col sm:flex-row gap-8 items-center justify-between">
		{content.findMeAtMujina}
		<a class="text-red-400 hover:scale-110" href="https://mujina.se"
			><img class="h-8 hidden sm:visible" src="/mujina.svg" alt="Mujina logo" /><span
				class="sm:hidden">Mujina.se</span
			></a
		>
	</p>

	<p>{content.spendTime}</p>

	<p class="flex flex-col sm:flex-row gap-8 items-center justify-between">
		{content.needForWork}
		<a class="flex gap-2 text-red-400 hover:scale-110" href="mailto: anton@mujina.se"
			>anton@mujina.se <img class="h-8 hidden sm:visible" src="/envelope.svg" alt="envelope" /></a
		>
	</p>

	<p class="flex flex-col sm:flex-row gap-8 items-center justify-between">
		{content.private}
		<a class="flex gap-2 text-red-400 hover:scale-110" href="mailto: a.appelblom@gmail.com"
			>a.appelblom@gmail.com <img
				class="h-8 hidden sm:visible"
				src="/envelope.svg"
				alt="envelope"
			/></a
		>
	</p>

	<p class="flex gap-8 items-center justify-between">
		{content.greeting}
		<img class="h-8 hidden sm:visible" src="/applebranch.svg" alt="apple branch" />
	</p>
</div>
