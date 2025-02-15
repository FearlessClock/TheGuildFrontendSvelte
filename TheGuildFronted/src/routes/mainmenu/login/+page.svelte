<script lang="ts">
    import { login } from "$lib/services/auth.service";
    import { goto } from "$app/navigation";

    let username:string = "";
    let password:string = "";

    let errorMessage:string = "";
    let isLoading:boolean = false;

    const loginCallback =async () =>{
        try {
            isLoading = true;
            let user = await login(username, password).then((user) =>{
                goto("/mainmenu/guild/select")
                console.log(user);
            }).catch((error) => {
                isLoading = false;
                errorMessage = error.message;
                return null;
            });
        } catch (error) {
            console.log(error);
        }
    }
</script>

<p class="text-xl m-4">Welcome back to your guild</p>
<div class="flex items-center justify-center">
    <div class="card shadow-xl w-1/2 items-center justify-center">
        <div class="card-title m-4 text-center">
            <p>Log in</p>
        </div>
        <div class="card-body m-4 gap-4">
            <form class="flex flex-col gap-4" on:submit|preventDefault={loginCallback}>
                <label class="floating-label">
                    <span>Username</span>
                    <input type="text" placeholder="Username" class="input input-md" bind:value={username}>
                </label>
                
                <label class="floating-label">
                    <span>Password</span>
                    <input type="password" placeholder="Password" class="input input-md" bind:value={password}>
                </label>
                
                <button class="btn btn-primary w-full" disabled={isLoading}>Log in</button>
            </form>
            <a href="/mainmenu/register" class="btn btn-link btn-s m-2 self-center">Don't have an account?</a>
            {#if errorMessage}
                <div class="alert alert-error">{errorMessage}</div>
            {/if}
            {#if isLoading}
            <span class="self-center loading loading-ring loading-xl"></span>
            {/if}
        </div>
    </div>
</div>