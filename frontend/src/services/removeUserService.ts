export default async function removeUserService(token: string, username: string) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return await fetch(`http://localhost:8080/users/${username}`, fetchOptions)
}