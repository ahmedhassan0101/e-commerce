"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  CircleUser,
  Heart,
  ListOrdered,
  Mail,
  MapPinHouse,
} from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

export default function AccountMenu() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <img
            src={"https://avatar.iran.liara.run/public"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">
            {session ? session?.user.name : "Guest"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex flex-col items-center space-y-2 text-semi-darker">
          <img
            src="/profile.png"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-center">
            <p>Welcome Back,</p>
            <p className="text-lg font-bold">
              {session ? session?.user.name : "Guest"}
            </p>

            {session ? (
              <button
                onClick={() => signOut()}
                className="text-blue-600 text-sm"
              >
                Sign out
              </button>
            ) : (
              <Link href={"/api/auth/signin"} className="text-blue-600 text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
        <hr className="my-4" />
        <DropdownMenuGroup>
          <MenuItem href="/account" icon={CircleUser}>
            Account
          </MenuItem>
          <MenuItem href="/orders" icon={ListOrdered}>
            My Orders
          </MenuItem>
          <MenuItem href="/messages" icon={Mail}>
            Message Center
          </MenuItem>
          <MenuItem href="/address" icon={MapPinHouse}>
            Address
          </MenuItem>
          <MenuItem href="/wishlist" icon={Heart}>
            Wishlist
          </MenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const MenuItem = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.FC<any>;
  children: React.ReactNode;
}) => (
  <DropdownMenuItem>
    <Link href={href} className="flex text-sm-semi-darker">
      <Icon className="mr-2 size-5 icon" />
      <span>{children}</span>
    </Link>
  </DropdownMenuItem>
);
