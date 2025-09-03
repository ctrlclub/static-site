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

<form on:submit|preventDefault={handleSubmit} novalidate>
    <label for="email">Email</label>
    <input
        id="email"
        name="email"
        type="email"
        bind:value={email}
        on:blur={onEmailBlur}
        required
    />
    {#if emailError}
        <p style="color:crimson;margin:0.25rem 0;">{emailError}</p>
    {/if}
  
    <label for="password">Password</label>
    <input
        id="password"
        name="password"
        type="password"
        bind:value={password}
        on:blur={onPasswordBlur}
        required
        minlength="8"
    />
    {#if passwordError}
        <p style="color:crimson;margin:0.25rem 0;">{passwordError}</p>
    {/if}
  
    <button type="submit" disabled={!submitButtonEnabled}>Sign in</button>

    {#if message}
        <p style="margin-top:0.5rem;">{message}</p>
    {/if}
</form>
