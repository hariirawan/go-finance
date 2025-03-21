import { IconChevronDown } from "@tabler/icons-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavUser() {
  const { handleLogout } = useLogout();
  const { data } = useProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row border-l border-l-blue-700 items-center px-3 py-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={data?.data.avatar} />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-white ml-3">
            <div className="flex flex-row">
              <h2 className="flex-1 text-ellipsis text-sm font-bold">
                {`${data?.data.first_name} ${data?.data.last_name}` ||
                  data?.data.first_name}
              </h2>
              <IconChevronDown size={16} />
            </div>
            <p className="text-xs">{data?.data.email}</p>
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
