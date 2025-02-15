<script lang="ts">
    import type { PageData } from './$types';
    import CartColumn from "./components/CartsColumn.svelte";

    import {getWorkshops, getCarts} from "$lib/services/workshop.service";
	import type { Character } from '$lib/Types/Character';

    let { data }: { data: PageData } = $props();


    const charJson : string = localStorage.getItem("character")!;

    let character : Character = JSON.parse(charJson);

    getWorkshops(character.country).then((workshops) => {
        console.log(workshops);
    }); 
    
</script>
<div class="flex flex-col h-full w-full">
    <h1 class="text-5xl">Workshop name</h1>
    <div class="flex flex-row flex-grow"> 
        <CartColumn />
        <CartColumn />
        <CartColumn />
        <CartColumn />
    </div>
</div>