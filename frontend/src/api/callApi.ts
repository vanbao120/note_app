export async function callApi({ body }: { body: string }) {
    if (!localStorage.getItem('accessToken')) return null
    const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body
    })
    if (!res.ok) {
        if (res.status === 403) {
            return null
        }
    }
    const { data } = await res.json()
    return data
}