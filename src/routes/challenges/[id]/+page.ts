export const ssr = false;

import { API_URL } from "$lib/api";
import type { ChallengeFetch } from "$types/challenges";

export async function load({ params }): Promise<ChallengeFetch> {
    if(!(/^\d+$/.test(params.id))) { // if not integer
        return { success: false, errorReason: "Challenge ID wasn't an integer", challengeId: params.id, data: undefined }; 
    }

    let id = parseInt(params.id) - 1;
    let res = await fetch(`${API_URL}/challenges/${id}`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    let response = await res.json();

    if(!response.success) {
        return { success: false, errorReason: response.errorReason, challengeId: id, data: undefined }; 
    }

    return { success: response.success , errorReason: "", challengeId: id, data: response.data };
}
