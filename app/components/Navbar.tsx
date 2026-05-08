"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { EmailAddress } from "@clerk/nextjs/server";
import { FolderGit2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkAddUser } from "../actions";

const Navbar = () => {
  const {user} = useUser()
  const [open, setOpen] = useState(false);
  const pathname=usePathname()
  const isActiveLink = (href : string) =>
  pathname.replace(/\/$/, "") ===href.replace(/\/$/, "");
 const renderLinks = (style: string) => {
    return (
      <>
        <Link href="/dashboard">
        <span className={`${style} ${isActiveLink("/dashboard") ? "btn-primary" : "btn-ghost"}`}>
          Dashboard
        </span>
        </Link>

        <Link href="/projects">
          <span className={`${style} ${isActiveLink("/projects") ? "bg-primary text-primary-content" : ""}`}>
            Projects
          </span>
        </Link>
      </>
    );
  };
  useEffect(() => {
  if (user?.primaryEmailAddress?.emailAddress && user?.fullName){
   checkAddUser(user?.primaryEmailAddress?.emailAddress, user?.fullName)
  }
},[user])
  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-primary-content text-primary rounded-full p-2">
            <FolderGit2 className="w-6 h-6" />
          </div>

          <span className="ml-3 font-bold text-3xl">
            Task <span className="text-primary">Flow</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4 items-center">
          {renderLinks("btn")}
          <UserButton />
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden btn btn-sm"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Menu */}
        {open && (
         <div className={`absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center gap-6 p-4 transition-all duration-300 sm:hidden bg-white z-50 ${open ? "-left-0" : "left-full"}`}>

            <div className="flex justify-between items-center">
              <UserButton />

              <button
                onClick={() => setOpen(false)}
                className="btn btn-sm w-fit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {renderLinks("btn")}
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;