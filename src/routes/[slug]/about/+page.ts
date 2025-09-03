export async function load({ params, fetch }): Promise<{ ip: string, slug: string }> {
    return { ip: "hi", slug: params.slug };
}
