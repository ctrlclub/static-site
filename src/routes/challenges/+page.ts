import { API_URL } from "$lib/api.ts";
import type { ChallengeListing, ChallengeListingResponse } from "$types/challenges";

export async function load(): Promise<ChallengeListingResponse> {
    let res = await fetch(`${API_URL}/challenges/list`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    
    console.log(res.status)
    if(res.status != 200) {
        return { success: false, challenges: [] };
    }

    let obj = await res.json();
    if(obj.success) {
        console.log(obj["data"])
        return { success: true, challenges: obj["data"] as Array<ChallengeListing> };
    } else {
        return { success: false, challenges: []};
    }
}
