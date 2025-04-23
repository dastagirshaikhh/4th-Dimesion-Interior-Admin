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

    if (username === process.env.ADMIN_USERNAME! && password === process.env.ADMIN_PASSWORD!) {
        (await cookies()).set("auth", "true", { httpOnly: true })
        redirect("/dashboard")
    } else {
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


