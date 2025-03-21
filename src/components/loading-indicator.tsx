import React from "react";
import { Spinner } from "./ui/spinner";

export default function LoadingIndicator() {
  return (
    <div className="bg-gray-800/30 fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center">
      <div className="flex flex-row items-center justify-center  bg-white p-4 rounded gap-2">
        <Spinner />
        <p>Loading...</p>
      </div>
    </div>
  );
}
