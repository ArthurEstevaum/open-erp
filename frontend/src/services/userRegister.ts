export default async function userRegister(token: string, username: string, password: string) {
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return await fetch("http://localhost:8080/auth/register", fetchOptions)
}