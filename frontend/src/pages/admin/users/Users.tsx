import { Skeleton } from "@/components/ui/skeleton";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type Permission = {
  id: number;
  name: string;
};

export type UserData = {
  permissions: Permission;
  user: User;
};

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<Array<UserData>>([]);

  useEffect(() => {
    async function getUserData() {
      const response = await userService(localStorage.getItem("token") ?? "");
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } else {
        setError("Error while fetching data");
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-10">Usuários & permissões</h2>
        <div className="border border-gray-400 rounded-xl space-y-5 p-10">
          <Skeleton className="w-full h-[50px] rounded-lg" />
          <Skeleton className="w-full h-[50px] rounded-lg" />
          <Skeleton className="w-full h-[50px] rounded-lg" />
          <Skeleton className="w-full h-[50px] rounded-lg" />
          <Skeleton className="w-full h-[50px] rounded-lg" />
        </div>
      </main>
    );
  }
  return (
    <main className="container mx-auto py-10">
      {error && (
        <Alert
          variant="destructive"
          className="mt-4 dark:text-red-500 dark:border-red-500"
        >
          <AlertCircle className="dark:text-red-500 h-4 w-4" />
          <AlertTitle>Erro ao conectar com o servidor</AlertTitle>
          <AlertDescription>Tente novamente mais tarde.</AlertDescription>
        </Alert>
      )}
      <h2 className="text-2xl font-semibold mb-10">Usuários & permissões</h2>
      <DataTable columns={columns} data={userData} />
    </main>
  );
}
