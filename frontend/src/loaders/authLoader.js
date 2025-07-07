import { redirect } from "react-router-dom";

export async function authLoader(expectedRole = null) {
    try {
        const response = await fetch(import.meta.env.VITE_VALIDATE_API, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return redirect("/login");
        }

        const result = await response.json();

        if (!result.valid) {
            return redirect("/login");
        }

        if (expectedRole && result.user.role !== expectedRole) {
            return redirect("/");
        }

        
        return result.user;
    } catch {
        return redirect("/login");
    }
}