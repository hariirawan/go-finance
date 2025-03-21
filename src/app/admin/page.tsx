"use client";

import NavUser from "@/components/nav-user";
import { useUsers } from "@/hooks/useUsers";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

import { UserForm } from "@/components/user-form";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import DialogConfirmation from "@/components/dialog-confirmation";
import LoadingIndicator from "@/components/loading-indicator";

const value = {
  first_name: "",
  last_name: "",
  email: "",
};

export default function Admin() {
  const [search, setSearch] = useState("");
  const { data, handleSubmit, isProcessing, handleDelete } = useUsers(search);
  const [open, setOpen] = React.useState(false);
  const [defaultValue, setDefaultValue] = React.useState<IUser>({
    ...value,
  });
  const [isConfirmation, setIsConfirmation] = React.useState(false);

  return (
    <div className="bg-gray-50 min-h-screen max-w-screen over">
      {isProcessing && <LoadingIndicator />}
      <div className="sticky-top left-0 right-0 bg-blue-500 w-full">
        <div className="container flex justify-start md:justify-end items-center mx-auto">
          <NavUser />
        </div>
      </div>

      <div className="pt-24 px-2">
        <div className="container bg-white mx-auto">
          <div className="p-3 flex flex-row justify-between ">
            <h2 className="text-2xl font-bold">Users</h2>
            <Button
              onClick={() => {
                setOpen(true);
                setDefaultValue({ ...value });
              }}
            >
              Add User
            </Button>
          </div>
          <div className="flex flex-row items-center px-4 py-3 min-w-full border border-gray-200 border-b-0">
            <input
              type="text"
              placeholder="Search users"
              className="flex-1 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconSearch size={20} className="text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="bg-gray-50 border border-gray-200 min-w-full">
              <thead className="border-b border-gray-200 border-t">
                <tr>
                  <th className="text-left px-4 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left px-4 py-3">First Name</th>
                  <th className="text-left px-4 py-3">Last Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-right px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="dark:divide-gray-700 divide-gray-200 divide-y">
                {data?.map((users) => (
                  <tr key={users.id}>
                    <td className="text-left px-4 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="text-left px-4 py-3">{users.first_name}</td>
                    <td className="text-left px-4 py-3">{users.last_name}</td>
                    <td className="text-left px-4 py-3">{users.email}</td>
                    <td className="flex justify-end px-4 py-3 items-center">
                      <div
                        className="bg-gray-300 p-2 rounded-full mr-2 cursor-pointer"
                        onClick={() => {
                          setOpen(true);
                          setDefaultValue(users);
                        }}
                      >
                        <IconEdit size={24} />
                      </div>
                      <IconTrash
                        size={24}
                        onClick={() => {
                          setIsConfirmation(true);
                          setDefaultValue(users);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-14" />
        </div>
      </div>

      <UserForm
        open={open}
        setOpen={setOpen}
        defaultValue={defaultValue}
        handleSubmit={(value) => {
          setOpen(false);
          handleSubmit({ id: defaultValue?.id, ...value });
        }}
      />

      <DialogConfirmation
        open={isConfirmation}
        setOpen={setIsConfirmation}
        onDelete={() => {
          handleDelete({ id: defaultValue?.id });
          setIsConfirmation(false);
        }}
      />
    </div>
  );
}
