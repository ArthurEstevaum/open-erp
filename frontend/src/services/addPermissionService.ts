export default async function addPermissionService(
  token: string,
  username: string,
  permissionList: string[],
) {
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ permissionList, username }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch("http://localhost:8080/users/permissions", fetchOptions);
}

