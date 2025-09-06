export async function load({ params }): Promise<{ success: boolean, id: string }> {
    let res = await fetch(`https://ctrlclub.mqlvin.dev/challenges/${params.id}`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
    
    console.log(res.status)
    if(res.status != 200) {
        return { success: false, id: params.id };
    }

    let obj = await res.text();
    console.log(obj)

    return { success: true, id: params.id };
}
