"use client";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation";
import React from "react";


const Layout = ({children}: {children: React.ReactNode}) => {
  const {session} = useAuthStore();  // kya logged in hai
  const router = useRouter()

  React.useEffect(() => {
    if (session) {
      router.push("/")     // agr logged in hai to home pe push krwado
    }
  }, [session, router])   //dependencies session aur router pe change hoga

  if (session) {
    return null           // agr logged in hai to kuch nai krna
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
      
      <div className="relative">{children}</div>
    </div>
  )
}


export default Layout