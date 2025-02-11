"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
    const username = formData.get("username")
    const password = formData.get("password")

    // In a real application, you would validate the credentials against a database
    if (username === "admin" && password === "admin") {
        (await cookies()).set("auth", "true", { httpOnly: true })
        redirect("/dashboard")
    } else {
        // In a real application, you would handle this error more gracefully
        throw new Error("Invalid credentials")
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


