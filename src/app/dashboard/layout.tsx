"use client";
import { SessionProvider } from "next-auth/react"
const AuthLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-center bg-radial text-amber-100 drop-shadow-amber-100 from-sky-400 to-blue-800 h-full">
          <SessionProvider>
                {children}
            </SessionProvider>  
        </div>
    )
}

export default AuthLayout