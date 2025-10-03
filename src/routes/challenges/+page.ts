import { API_URL } from "$lib/api";
import type { ChallengeListing, ChallengeListingResponse } from "$types/challenges";
import { redirect } from "@sveltejs/kit";

export async function load(): Promise<ChallengeListingResponse> {
    let res = await fetch(`${API_URL}/challenges/list`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    
    console.log(res.status)
    if(res.status != 200) {
        return { success: false, challenges: [] };
    }

    let obj = await res.json();
    console.log(obj)
    if(obj.success) {
        return { success: true, challenges: obj["data"] as Array<ChallengeListing> };
    } else {
        console.warn("Status was 200 but no challenges were returned, assumed unauthenticated: " + obj["errorReason"]);
        console.warn("Hence, redirecting user to login.");

        return { success: false, challenges: [] };
    }
}

