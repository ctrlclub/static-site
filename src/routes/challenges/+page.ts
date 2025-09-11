import { API_URL } from "$lib/api.ts";
import type { ChallengeListingResponse } from "$types/challenges";

export async function load(): Promise<ChallengeListingResponse> {
    let res = await fetch(`${API_URL}/challenges/list`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    
    console.log(res.status)
    if(res.status != 200) {
        return { success: false, challenges: [] };
    }

    let obj = await res.json();
    return obj;
}
