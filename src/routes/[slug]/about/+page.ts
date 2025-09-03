export async function load({ params, fetch }): Promise<{ ip: string, slug: string }> {
    const res = await fetch("https://api.ipify.org?format=json");
    const post = await res.json();
    return { ip: post.ip, slug: params.slug };
}
