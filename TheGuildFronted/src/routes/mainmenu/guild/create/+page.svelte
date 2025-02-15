<script lang="ts">
	import type { Country } from '$lib/types/Country';
	import type { Profession } from '$lib/types/Profession';
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import {getCountries, getProfessions} from "$lib/services/world.service"

    let { data }: { data: PageData } = $props();

    let selectedCountry : Country|undefined = $state();
    let selectedProfession : Profession|undefined = $state();
    let familyName : string = $state("");
    let firstName : string = $state("");
    let countries : Country[] = $state([]);
    let professions : Profession[] = $state([]);

    onMount(async () => {
        countries = await getCountries();
        professions = await getProfessions();
    });

    function onclick() {
        localStorage.setItem("character", JSON.stringify(selectedCountry));
    }
</script>

<p class="text-xl m-4">Create your dynasty</p>
<div class="flex flex-col items-center justify-center">
    <div class="flex flex-grow flex-col m-4 min-w-50">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Where are you from?</legend>
            <select class="select select-primary" bind:value={selectedCountry}>
                {#each countries as country}
                    <option value={country}>{country.name}</option>
                {/each}
            </select>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">What do we call your family?</legend>
            <input class="input input-primary" bind:value={familyName} placeholder="Family name"/>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">What do we call you?</legend>
            <input class="input input-primary" bind:value={firstName} placeholder="First name"/>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">What is your profession?</legend>
            <select class="select select-primary" bind:value={selectedProfession}>
                {#each professions as profession}
                    <option value={profession}>{profession.name}</option>
                {/each}
            </select>
            {#if selectedProfession}
                <span class="fieldset-label">{selectedProfession.description}</span>
            {/if}
        </fieldset>
    </div>
    
    <div class="flex flex-col gap-4">
        <button class="btn btn-primary" onclick={onclick} disabled={selectedCountry==undefined || selectedCountry==undefined || firstName=="" || familyName==""}>Create family</button>
        <a class="btn btn-link" href="/mainmenu/guild/select">Already have a dynasty?</a>
    </div>
</div>