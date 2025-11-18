import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,

} from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  LucideUser } from "lucide-react"
import type React from "react"
import { useState } from "react"





export default function CardDemo() {

  const [email, setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login"); // State to track active tab
 

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    
    try {
      const res = await fetch(`http://localhost:5000/login/admin`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })

      const data = await res.json();
      setMessage(data.message);

      if(data.token){
        localStorage.setItem("token", data.token);
        window.location.href = "/admin";
      }
      
    } catch (error) {
      console.error("Error",error);
      setMessage("Server error. Try Again Later");
    }
  }
  
  return (
    <section className="flex justify-center items-center w-full h-screen " style={{backgroundImage: "url('/public/bf9a18d6fbdbb68de604feadc175c609.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(80%)'}}>
    <div className="flex w-120 flex-col gap-6">
      <Tabs defaultValue="login" value={activeTab} onValueChange={(value)=> setActiveTab(value as "login" | "signup")} >
      
      {/* Login Tab */}
        <TabsContent value="login">

          <Card className="bg-blur-lg bg-white/30">
            <CardHeader>
              <CardTitle className="w-full flex justify-center text-2xl">Admin Login</CardTitle>
              
            </CardHeader>
            
            <CardContent className="grid gap-6 ">
              <form onSubmit={handlesubmit} autoComplete="off">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Email</Label>
                <Input id="tabs-demo-name" autoComplete="off" placeholder="@gmail.com" className="border-t-0 border-l-0 border-r-0  border-b-2 border-black rounded-none" onChange={(e)=>setEmail(e.target.value)} /><LucideUser className="absolute mt-9 ml-100" size={17}/>
              </div>
              <div className="grid gap-3 mt-8">
                <Label htmlFor="tabs-demo-username">Password <span className="hover:underline hover:cursor-pointer ml-77 ">Forget</span></Label>
                <Input id="tabs-demo-username" type="password" autoComplete="new-password" className="border-t-0 border-l-0 border-r-0  border-b-2 border-black rounded-none" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
              </div>
                 <Button className="cursor-pointer items-center mt-8" type="submit">Log In</Button>
                 </form>
            </CardContent>
         
            
            <CardFooter className="flex flex-col ">
              
              
              
              {message && <p className="text-center text-sm text-red-500 text-xl">{message}</p>}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  
    </section>
  )
}
