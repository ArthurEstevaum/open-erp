import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, List } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Permission } from "./users/Users";

export default function Permissions() {
  const { username } = useParams();
  const [data, setData] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await fetch(
        `http://localhost:8080/users/permissions/${username}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.ok) {
        setLoading(false);
        setData(await response.json());
        return;
      }
      setError("Error while fetching data");
      return;
    };
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return (
      <main className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-10">Permissões de {username}</h2>
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
    <main className="container mx-auto py-10 w-6/12">
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
      <h2 className="text-2xl font-semibold mb-10 mx-auto text-slate-700">Permissões de {username}</h2>
      <Table className="m-auto mt-10 p-10">
        <TableCaption>
          Lista de permissões possuídas pelo usuário {username} atualmente
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((permission) => (
                <TableRow key={permission.id}>
                    <TableCell>{permission.id}</TableCell>
                    <TableCell>{permission.name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
      <section>
        <h2 className="text-2xl font-semibold mb-10 mx-auto text-slate-700 mt-10">Adicionar permissões</h2>
          <List className="text-slate-500" />
      </section>
    </main>
  );
}
