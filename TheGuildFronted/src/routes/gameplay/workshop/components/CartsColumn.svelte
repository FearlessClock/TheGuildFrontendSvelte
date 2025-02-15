<script lang="ts">
	import type { Cart } from "$lib/types/CartInformation";
	import type { Character } from "$lib/Types/Character";
    import CartInformation from "./CartInformation.svelte"

    let carts: Cart[] = [
        {id:1, name:"Cart 1", timeTillArrival:4, isMoving:true, maxCarryAmount:16, numberOfSpaces:3, carried_items:[{id:1, quantity:3, item_information:{id:1, name:"wood", current_price:54}}, {id:2, quantity:2, item_information:{id:2, name:"stone", current_price:15}}]},
        {id:2, name:"Cart 2", timeTillArrival:4, isMoving:false, maxCarryAmount:16, numberOfSpaces:6, carried_items:[]},
        {id:3, name:"Cart 3", timeTillArrival:4, isMoving:false, maxCarryAmount:16, numberOfSpaces:4, carried_items:[{id:3, quantity:4, item_information:{id:3, name:"Log", current_price:22}}]}]
</script>

<div class="flex flex-col flex-grow">
    <h1 class="text-xl text-center">Cart Information</h1>
    <div class="flex flex-col flex-grow p-4 m-4 border-dotted border-2 gap-4">
        {#each carts as cart}
            <CartInformation information={cart}/>
        {/each}
    </div>
</div>