export default async function userService(token: string) {
    return await fetch("http://localhost:8080/users/permissions", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}