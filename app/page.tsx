import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "./actions/actions"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form action={login}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input type="text" id="username" name="username" required className="mt-1 block w-full" />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input type="password" id="password" name="password" required className="mt-1 block w-full" />
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

