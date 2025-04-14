"use client";

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActionState } from "react";
import { State, login } from "./actions/actions";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const initialState: State = { 'message': '', 'errors': { "username": '', 'password': '' } }
  const [state, formAction] = useActionState(login, initialState)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // <div className="p-4">
    //   <h1 className="text-xl font-bold mb-4">Login</h1>
    //   <form action={formAction} className="space-y-4">
    //     <Input
    //       type="text"
    //       name="username"
    //       placeholder="Text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <Input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Button type="submit" className="bg-blue-600 text-white px-4 py-2">
    //       Login
    //     </Button>
    //   </form>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form action={formAction}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
}
