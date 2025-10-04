<script lang="ts">
    import type { LoginResponse, LoginAttempt } from "$types/auth.ts";
    import { attemptLogin, validateEmail, validatePassword } from "$lib/auth.ts";
    import { goto } from "$app/navigation";

    import "$components/Globals.css";


    let email = $state("");
    let password = $state("");
    let message = $state("");
    let emailError = $state("");
    let passwordError = $state("");
    let submitButtonEnabled = $state(true);


    function onEmailBlur() {
        emailError = email ? (validateEmail(email) ? "" : 'Enter a valid email') : 'Email is required';
    }

    function onPasswordBlur() {
        passwordError = password ? (validatePassword(password) ? "" : 'Password must be at least 8 characters') : 'Password is required';
    }
    
    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        message = "";

        submitButtonEnabled = false;
        setTimeout(() => {
            submitButtonEnabled = true;
        }, 2000);

        // final check everythings good before submit
        onEmailBlur();
        onPasswordBlur();
        if(emailError || passwordError) return;

        let credentials: LoginAttempt = { email: email, password: password };
        console.log("Attempting login...");
        let loginResponse: LoginResponse = await attemptLogin(credentials);

        if(loginResponse.success) {
            goto("/challenges");
            return;
        }

        message = loginResponse.errorReason;
        console.log(`Failed to login: ${loginResponse.errorReason}`)
    }
</script>

<div id="login-page">

    <div id="center" class="cartoon-border">
        <div id="center-title">
            <img src="/assets/logo_128.svg" width="128" height="128" id="logo" />
            <!-- <a>Login</a> -->
        </div>

        <div id="login-container">
            <form on:submit|preventDefault={handleSubmit} novalidate>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email..."
                    bind:value={email}
                    on:blur={onEmailBlur}
                    required
                />
                {#if emailError}
                    <p class="form-error">{emailError}</p>
                {:else}
                    <p class="form-error">&nbsp;</p>
                {/if}
              
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Code..."
                    bind:value={password}
                    on:blur={onPasswordBlur}
                    required
                    minlength="8"
                />
                {#if passwordError}
                    <p class="form-error">{passwordError}</p>
                {:else}
                    <p class="form-error">&nbsp;</p>
                {/if}
              
                <button class="cartoon-button" id="submit-button" type="submit" disabled={!submitButtonEnabled}>Let's Go 👉</button>

                {#if message}
                    <p class="form-error">{message}</p>
                {:else}
                    <p class="form-error">&nbsp;</p>
                {/if}
            </form>
        </div>
    </div>
</div>

<style>
    #login-page {
        background-color: #fff1e6;

        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-image: radial-gradient(#00000030 1px, transparent 1px);
        background-size: 26px 26px;
    }

    #center {
        width: 540px;
        height: 600px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 40px;
    }

    #logo {
    }

    #center-title {
        display: flex;
        flex-direction: column;
        align-items: center;

        font-weight: 800;
    }

    #login-container {
        width: 300px;
        height: 200px;

    }

    form {
        width: 300px;
        height: 250px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input {
        width: 300px;

        background-color: transparent;
        border: none;
        border-bottom: 1px solid #333;

        font-family: "Roboto Mono", monospace;
    }

    input::placeholder {
        font-family: "Roboto Mono", monospace;
    }

    .form-error {
        font-size: 0.8em;
        color: #ee3232;
    }

    #submit-button {
        width: 180px;
        margin-top: 20px;
        margin-bottom: 10px;

        font-weight: 500;

        color: white;
        transition: 0.2s;

        background-color: #322222;

    }

    #submit-button:hover {
        background-position: right bottom;
        cursor: pointer;
    }
</style>
