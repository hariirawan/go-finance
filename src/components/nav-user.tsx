import { IconChevronDown, IconUserCircle } from "@tabler/icons-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";

export default function NavUser() {
  const { handleLogout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row border-l border-l-blue-700 items-center px-3 py-2 cursor-pointer">
          <IconUserCircle size={40} className="text-white" />
          <div className="flex flex-col text-white ml-3">
            <div className="flex flex-row">
              <h2 className="flex-1 text-ellipsis text-sm font-bold">
                JASON LEEE L.W.
              </h2>
              <IconChevronDown size={16} />
            </div>
            <p className="text-xs">Sales Lead</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
