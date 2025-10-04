export const ssr = false;

import { API_URL } from "$lib/api";
import type { DashboardContent, LoadDashboard } from "$types/dashboard";

export async function load(): Promise<LoadDashboard> {
    let res = await fetch(`${API_URL}/dashboard/auth`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    let response = await res.json();

    if(response.success == false) {
        return { success: false, errorReason: response["errorReason"], content: undefined };
    }

    let reqChallenges = await fetch(`${API_URL}/dashboard/challenges`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    let resChallenges = await reqChallenges.json();

    if(resChallenges.success == false) {
        return { success: false, errorReason: "Failed to load challenges: " + response["errorReason"], content: undefined };
    }

    let content: DashboardContent = { challenges: resChallenges["data"] };

    return { success: true, errorReason: "", content };
}

