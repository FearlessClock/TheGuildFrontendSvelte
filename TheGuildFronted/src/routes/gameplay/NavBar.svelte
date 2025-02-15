<script lang=ts>
    import {GetCurrentUserInformationWithPromise } from "$lib/services/auth.service";
	import type { UserFullInformation } from "$lib/types/UserInformation";

    let user : UserFullInformation | undefined = $state();
    GetCurrentUserInformationWithPromise().then((data) => {
        user = data;
    }).catch((error) => {
        console.log(error.message);
    });
</script>

<div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
    </div>
    <div class="navbar-center">
      <p class="text-xl">The guild</p>
    </div>
    <div class="navbar-end mr-8">
        {#if user}
            <p>{user.username}</p>
        {:else}
            <a href="/mainmenu/login" class="btn btn-primary">Log in</a>
        {/if}
    </div>
</div>