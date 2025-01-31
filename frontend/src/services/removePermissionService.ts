export default async function removePermissionService(token: string, username: string, permissionsList: string[]) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const permissionsAsQueryParams = permissionsList.toString()

    return await fetch(`http://localhost:8080/permissions/${username}?permissions=${permissionsAsQueryParams}`, fetchOptions)
}