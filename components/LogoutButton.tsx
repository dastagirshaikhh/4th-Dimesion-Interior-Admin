"use client";

import { logout } from "@/app/actions/actions";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button className="bg-red-500 text-white px-4 py-2" onClick={logout}>
      Logout
    </Button>
  );
}
