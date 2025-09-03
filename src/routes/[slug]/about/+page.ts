export async function load({ params, fetch }): Promise<{ ip: string, slug: string }> {
    const res = await fetch("https://ctrlclub.mqlvin.dev/auth/whoami", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    const post = await res.json();
    return { ip: post.ip, slug: params.slug };
}
