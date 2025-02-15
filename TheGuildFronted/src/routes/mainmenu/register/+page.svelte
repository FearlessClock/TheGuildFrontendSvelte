<script lang="ts">
    import { register } from "$lib/services/auth.service";
    import { goto } from "$app/navigation";

    let fullName:string = "";
    let username:string = "";
    let email:string = "";
    let password:string = "";
    let confirmPassword:string = "";

    let errorMessage:string = "";
    let isLoading:boolean = false;

    const registerCallback =async () =>{
        if(password != confirmPassword){
            errorMessage = "Passwords do not match";
            return;
        }

        try {
            let user = await register(username, password, email, password).then((user) =>{
                goto("/mainmenu/login")
                console.log(user);
            }).catch((error) => {
                errorMessage = error.message;
                return null;
            });
        } catch (error) {
            console.log(error);
        }
    }
</script>

<p class="text-xl m-4">Time to create your guild</p>
<div class="flex items-center justify-center">
    <div class="card shadow-xl w-1/2 items-center justify-center">
        <div class="card-title m-4 text-center">
            <p>Sign up</p>
        </div>
        <div class="card-body m-4 gap-4">
            <form class="flex flex-col gap-4" on:submit|preventDefault={registerCallback}>
                <label class="floating-label">
                    <span>Name</span>
                    <input type="text" placeholder="Name" class="input input-md" bind:value={fullName}>
                </label>
                <label class="floating-label">
                    <span>Username</span>
                    <input type="text" placeholder="Username" class="input input-md" bind:value={username}>
                </label>
                <label class="floating-label">
                    <span>Email</span>
                    <input type="email" placeholder="Email" class="input input-md" bind:value={email}>
                </label>
                <label class="floating-label">
                    <span>password</span>
                    <input type="password" placeholder="password" class="input input-md" bind:value={password}>
                </label>
                <label class="floating-label">
                    <span>Confirm password</span>
                    <input type="password" placeholder="Confirm password" class="input input-md" bind:value={confirmPassword}>
                </label>
                <button class="btn btn-primary w-full" disabled={isLoading}>Register</button>
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