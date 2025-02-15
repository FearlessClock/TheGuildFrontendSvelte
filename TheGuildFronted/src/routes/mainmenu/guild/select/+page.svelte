<script lang="ts">
	import { goto } from "$app/navigation";
    import { GetCharacters } from "$lib/services/guild.service";
	import type { Character } from "$lib/Types/Character";
	import { onMount } from "svelte";

    let guilds : Character[] = $state([]);

    onMount(async () => {
        guilds = await GetCharacters();
    });
    let isLoading:boolean = false;
    let selectedCharacter:Character|undefined = $state();
    
    function onclick() {
        if(selectedCharacter == undefined) return;
        isLoading = true;
        localStorage.setItem("character", JSON.stringify(selectedCharacter));
        goto("/gameplay/workshop");   
        isLoading = false;
    }

</script>

<p class="text-xl m-4">Which guild would you like to play as?</p>
<div class="flex flex-col items-center justify-center">
    <div class="flex flex-grow flex-col m-4">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Pick your character</legend>
        </fieldset>
        <select class="select select-primary" bind:value={selectedCharacter}>
            {#each guilds as guild}
                <option value={guild}>The {guild.familyName} family</option>
            {/each}
        </select>
    </div>
    <div class="stats border-dotted p-2 border-2 gap-4 mb-4">
        <div class="stat place-items-center">
          <div class="stat-title">Game time</div>
          <div class="stat-value">4d</div>
        </div>
      
        <div class="stat place-items-center">
          <div class="stat-title">Money</div>
          <div class="stat-value text-secondary">4,200</div>
        </div>
      
        <div class="stat place-items-center">
          <div class="stat-title">Rank</div>
          <div class="stat-value">Baron</div>
        </div>
    </div>
    <div class="flex flex-col gap-4">
        <button class="btn btn-primary" onclick={onclick} disabled={selectedCharacter==undefined}>Choose the character</button>
        <a class="btn btn-secondary" href="/mainmenu/guild/create">Start a new dynasty</a>
    </div>
</div>