<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import NavBar from "./NavBar.svelte";
    import Sidebar from "./Sidebar.svelte";

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>
<div class=" h-screen w-screen flex flex-col">
    <NavBar />
    <div class="flex flex-row h-full">
        <Sidebar />
        {@render children()}
    </div>
</div>