import { ColumnDef } from "@tanstack/react-table";
import { Permission, UserData } from "./Users";
import UserActions from "./user-actions";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "user.id",
    header: "Id",
  },
  {
    id: "username",
    accessorKey: "user.username",
    header: "Nome de usuário",
    cell: ({ cell }) => {
      const cellValue = cell.getValue() as string;
      return <div className="font-medium text-lg p-2">{cellValue}</div>;
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissões",
    cell: ({ cell }) => {
      const cellValue = cell.getValue() as Permission[];
      const permissions = cellValue.map((element) => element.name);
      if (permissions.length === 0)
        return <div className="font-medium">{"all permissions"}</div>;
      return <div className="font-medium">{permissions.join(" - ")}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const username = row.getValue("username") as string
      return <UserActions username={username} />;
    },
  },
];
