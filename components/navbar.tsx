import { UserButton, auth } from "@clerk/nextjs";

import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("sign-in");

  return (
    <div className="border-b">
      <div className="flex h-16 justify-between items-center px-4">
        <div className=" flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              objectFit="cover"
              width={200}
              height={100}
            />
          </Link>
        </div>
        <div className=" flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
