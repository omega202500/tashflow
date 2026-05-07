"use client";
import { UserButton } from "@clerk/nextjs";
import { BookText, Bug, Icon, LayoutDashboard} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FolderGit2 } from "lucide-react";

const Navbar = () => {

  const renderLinks = (style: string) => {
    return (
      <>
        <Link href="/dashboard">
          <span className={style}>Dashboard</span>
        </Link>
        <Link href="/projects">
          <span className={style}>Projects</span>
        </Link>
      </>
    );
  };

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">
      <div className="flex justify-between items-center">

        <div className="flex items-center">
          <div className="bg-primary-content text-primary rounded-full p-2">
            <FolderGit2 className="w-6 h-6" />
          </div>

          <span className="ml-3 font-bold text-3xl">
            Task <span className="text-primary">Flow</span>
          </span>
        </div>

        <div>
          {renderLinks("btn")}
          <UserButton />
        </div>

      </div>
    </div>
  );
};

export default Navbar; 

function userSate(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
