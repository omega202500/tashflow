"use client";
import { FolderGit } from "lucide-react";
import React from "react";
import Navbar from "./Navbar";

type wrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: wrapperProps) => {
  return (
    <div>
      <Navbar />
      <div className="px-5 md:px-[10%] mt-8 mb-10">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;