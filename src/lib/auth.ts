import type { LoginAttempt, LoginResponse } from "$types/auth";


export const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const validatePassword = (v: string) =>
    v.length >= 4;

export async function attemptLogin(credentials: LoginAttempt): Promise<LoginResponse> {
    let status: LoginResponse = {
        success: false,
        errorReason: "Unknown"
    };

    try {
        // try login with credentials
        let res = await fetch("https://ctrlclub.mqlvin.dev/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include"
        });

        // if login process went okay, check if they're logged in
        if(res.ok) {
            const loginResponse = await res
                .json()
                .catch((err) => {
                    status.errorReason = err;
                    return status; // return false with error reason if failed to parse json
                }) as LoginResponse;

            return loginResponse; // login could've failed or not, but it has a reason already! so that's fine
        } else { // catch any network errors usually
            status.errorReason = `error_code:${res.status}`;
        }
    } catch(ex) { // catch any overarching errors
        status.errorReason = ex;
    }

    return status; // always success is false in this scenario
}
