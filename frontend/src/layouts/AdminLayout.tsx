import { AuthContext } from "@/auth/AuthContext"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router"

export default function AdminLayout() {
    const auth = useContext(AuthContext)
    return (
        <div>
            {auth?.permissions.includes("admin")? <Outlet /> : <Navigate to={"/acesso-negado"} />}
        </div>
    )
}