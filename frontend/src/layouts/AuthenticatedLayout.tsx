import { AuthContext } from "@/auth/AuthContext"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router"

export default function AuthenticatedLayout() {
    const auth = useContext(AuthContext)
    return (
        <div>
            {auth?.isAuthenticated? <Outlet /> : <Navigate to={"/acesso-negado"} />}
        </div>
    )
}