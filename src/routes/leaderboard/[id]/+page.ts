export const ssr = false;

import { API_URL } from "$lib/api";
import { redirect } from "@sveltejs/kit";

export async function load({ params }): Promise<{ id: number | undefined}> {
    if(!(/^\d+$/.test(params.id))) { return { id: undefined } };

    let res = await fetch(`${API_URL}/dashboard/auth`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    let response = await res.json();

    if(response.success == false) {
        redirect(307, "/");
    }

    return { id: parseInt(params.id) - 1 };
}

