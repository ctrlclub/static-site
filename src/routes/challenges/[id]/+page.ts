export const ssr = false;

import { API_URL } from "$lib/api";
import type { ChallengeFetch } from "$types/challenges";
import type { MyTeamRequest } from "$types/teams";

export async function load({ params }): Promise<ChallengeFetch> {
    if(!(/^\d+$/.test(params.id))) { // if not integer
    return { success: false, errorReason: "Challenge ID wasn't an integer", challengeId: params.id, data: undefined, teamData: undefined }; 
    }

    let id = parseInt(params.id) - 1;
    let res = await fetch(`${API_URL}/challenges/${id}`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    let response = await res.json();

    if(!response.success) {
        return { success: false, errorReason: response.errorReason, challengeId: id, data: undefined, teamData: undefined }; 
    }

    if(response.data.isTeamChallenge) {
        console.log("Grabbing extra team data...");
        let teamReq = await fetch(`${API_URL}/teams/myteam`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
        let teamResponse: MyTeamRequest = await teamReq.json();

        if(teamResponse.success == false) {
            return { success: false, errorReason: teamResponse.errorReason, challengeId: id, data: undefined, teamData: undefined };
        }

        return { success: response.success , errorReason: "", challengeId: id, data: response.data, teamData: teamResponse.data };
    }

    return { success: response.success , errorReason: "", challengeId: id, data: response.data, teamData: undefined };
}
