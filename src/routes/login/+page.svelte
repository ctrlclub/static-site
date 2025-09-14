<script lang="ts">
    import type { LoginResponse, LoginAttempt } from "$types/auth.ts";
    import { attemptLogin, validateEmail, validatePassword } from "$lib/auth.ts";


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
            window.location.href = "/challenges";
            return;
        }

        message = loginResponse.errorReason;
        console.log(`Failed to login: ${loginResponse.errorReason}`)
    }
</script>

<div id="login-page">

    <div id="center">
        <div id="center-title">
            <img src="/assets/logo_128.svg" width="128" height="128" id="logo" />
            <a>Login</a>
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
              
                <button id="submit-button" type="submit" disabled={!submitButtonEnabled}>Let's Go ➔</button>

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
        background-color: #fafafa;
        border: 1px solid #111;
        border-radius: 5px;

        width: 540px;
        height: 600px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 40px;

        box-shadow: -12px 11px 0px -1px rgba(0,0,0,0.68);
        -webkit-box-shadow: -12px 11px 0px -1px rgba(0,0,0,0.68);
        -moz-box-shadow: -12px 11px 0px -1px rgba(0,0,0,0.68);
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
        background: linear-gradient(135deg, #b7b7a4, #797d62);
        background-position: left top;
        background-size: 150% 150%;
        border: 1px solid black;
        border-radius: 5px;

        width: 150px;
        height: 34px;

        color: white;
        transition: 0.55s;

        margin-top: 20px;
    }

    #submit-button:hover {
        background-position: right bottom;
        cursor: pointer;
    }
</style>
