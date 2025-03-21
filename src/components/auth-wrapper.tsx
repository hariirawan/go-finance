"use client";

import React, { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-12  h-screen">
      <div className=" hidden md:col-span-7  lg:col-span-8 md:flex h-full bg-gradient-to-t  from-blue-800 items-center to-blue-500">
        <div className="px-20">
          <h1 className="text-2xl text-white font-bold">GoFinance</h1>
          <p className="text-white font-bold">Lorem Ipsum dolor sit amet</p>
          <button className="bg-blue-500 rounded-full text-white mt-6 px-7 py-2">
            Read More
          </button>
        </div>
        <svg
          width="431"
          height="254"
          viewBox="0 0 431 254"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0"
        >
          <circle cx="152.5" cy="278.5" r="278" stroke="#0575E6" />
        </svg>
        <svg
          width="350"
          height="280"
          viewBox="0 0 350 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0"
        >
          <circle cx="71.5" cy="278.5" r="278" stroke="#0575E6" />
        </svg>
      </div>
      <div className="col-span-12 md:col-span-5 lg:col-span-4 grid items-center px-16">
        {children}
      </div>
    </div>
  );
}
