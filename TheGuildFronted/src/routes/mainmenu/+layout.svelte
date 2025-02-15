<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col text-center m-8">
    <h1 class="text-5xl font-bold">The guild online</h1>
    {@render children()}
</div>

