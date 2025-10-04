export const ssr = false;

import { API_URL } from "$lib/api";

// returns the string of where to redirect the user
export async function load(): Promise<{success: boolean, redirect: string, errorReason: string}> {
    try {
        let res = await fetch(`${API_URL}/auth/testsession`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        let response = await res.json();
        if(!response.success) {
            return { success: false, redirect: "", errorReason: "Server error: " + response.errorReason };
        }
        return { success: true, redirect: (response.data.isLoggedIn ? "/challenges" : "/login"), errorReason: "" };
    } catch(ex) {
        return { success: false, redirect: "", errorReason: "Failed to contact server: " + ex };
    }
}

