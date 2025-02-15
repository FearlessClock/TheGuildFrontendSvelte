<script lang="ts">
	import type { Cart } from "$lib/types/CartInformation";
    let {information} : {information:Cart} = $props();
    let itemSlots = Array.from({length: information.numberOfSpaces}, (_, i) => i);
</script>

<div class="flex flex-col border-2 gap-4 p-4">
    <h5 class="text-xl text-center">{information.name}</h5>
    <div class="flex flex-wrap gap-4 align-middle justify-center">
        {#each itemSlots as slot}
            <div class="bg-accent w-10 h-10">
                {#if information.carried_items[slot]}
                    <p class="text-center text-sm">{information.carried_items[slot].item_information.name}</p>
                    <p class="text-center text-sm">{information.carried_items[slot].quantity}</p>
                {/if}
            </div>
        {/each}
    </div>
</div>