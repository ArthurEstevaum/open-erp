import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import removeUserService from "@/services/removeUserService";
import { Link } from "react-router";

export default function UserActions({ username }: { username: string }) {

  async function deleteUser() {
    const response = await removeUserService(
      localStorage.getItem("token") ?? "",
      username
    );
    location.reload()
    return response;
  }

  return (
    <div className="space-x-8">
      <Button className="bg-blue-900">
        <Link to="/" className="text-white hover:text-white">
          Editar Permissões
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-700 text-white hover:bg-red-900">
          Excluir
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso removerá permanentemente a
              conta e suas permissões dos nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteUser} className="bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
