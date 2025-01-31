export default async function loginService(username: string, password: string) : Promise<Response> {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    }
    return await fetch("http://localhost:8080/auth/login" , fetchOptions)
}