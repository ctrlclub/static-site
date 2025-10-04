export const ssr = false;

export function load({ params }): { id: number } {
    return { id: parseInt(params.id) };
}
