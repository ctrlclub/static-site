export const ssr = false;

import { API_URL } from "$lib/api";
import type { ChallengeListing, ChallengeListingResponse } from "$types/challenges";
import type { MyTeamRequest } from "$types/teams";
import { redirect } from "@sveltejs/kit";

export async function load(): Promise<ChallengeListingResponse> {
    let res = await fetch(`${API_URL}/challenges/list`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    
    if(res.status != 200) {
        return { success: false, challenges: [], myTeam: undefined };
    }

    let obj = await res.json();
    if(obj.success) {
        let teamReq = await fetch(`${API_URL}/teams/myteam`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
        let teamResponse: MyTeamRequest = await teamReq.json();

        return { success: true, challenges: obj["data"] as Array<ChallengeListing>, myTeam: teamResponse.data };
    } else {
        console.warn("Status was 200 but no challenges were returned, assumed unauthenticated: " + obj["errorReason"]);
        console.warn("Hence, redirecting user to login.");

        throw redirect(307, "/login");
    }
}

