import React, { useState } from 'react'
import { useAuthStore } from '@/store/Auth'
function RegisterPage() {

    const {login} = useAuthStore();
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState("")

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        //collect data 
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        //validate data

        if( !email || !password){
            setError(()=>"Please fill all the details.")
            return 
        }

        //call the store
        setIsLoading(true)
        setError("")

        

        
            const loginResponse = await login(email.toString() , password.toString())
            if(loginResponse.error){
                setError(()=> loginResponse.error!.message)
            }
        
        setIsLoading(()=> false);
    }

  return (
    <div>RegisterPage</div>
  )
}

export default RegisterPage