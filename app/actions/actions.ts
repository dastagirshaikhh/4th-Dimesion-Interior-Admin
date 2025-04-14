"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type State = {
    errors: {
        username: string,
        password: string
    }
    message: string;
}

export async function login(state: State, payload: FormData): Promise<State> {
    const username = payload.get("username")
    const password = payload.get("password")

    console.log(username)
    console.log(password)

    // In a real application, you would validate the credentials against a database
    if (username === "admin" && password === "admin") {
        (await cookies()).set("auth", "true", { httpOnly: true })
        redirect("/dashboard")
    } else {
        // In a real application, you would handle this error more gracefully
        throw new Error("Invalid credentials")
    }
    return {
        message: 'test',
        errors: {
            username: 'test',
            password: 'test'
        }
    }
}

export async function logout() {
    (await cookies()).delete("auth")
    redirect("/")
}

export async function checkAuth() {
    const auth = (await cookies()).get("auth")
    if (!auth) {
        redirect("/")
    }
}


