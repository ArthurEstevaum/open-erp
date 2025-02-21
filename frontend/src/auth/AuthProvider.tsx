import { useState } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "./AuthContext";

export default function AuthProvider() {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(!!localStorage.getItem("token"))

    const [ permissions, setPermissions ] = useState<string>(JSON.parse(localStorage.getItem("permissions")) ?? "")

    function login(token: string, permissions: string[]) {
        localStorage.setItem("token", token)
        localStorage.setItem("permissions", JSON.stringify(permissions))
        setIsAuthenticated(true)
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("permissions")
        setPermissions("")
        setIsAuthenticated(false)
    }

    const auth = {
        login,
        logout,
        isAuthenticated,
        permissions
    }

    return (
        <AuthContext.Provider value={auth}>
            <Outlet />
        </AuthContext.Provider>
    )
}