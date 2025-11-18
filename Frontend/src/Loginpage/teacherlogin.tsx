import { Button } from "@/components/ui/button"
import { AppWindowIcon, CodeIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideLock,  LucideUser } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { Trigger } from "@radix-ui/react-tabs"




export default function TeacherDemo() {

  const [email, setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login"); // State to track active tab
 

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = activeTab === "login" ? "login/teacher" : "signup/teacher";

    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })

      const data = await res.json();
      setMessage(data.message);

      if(data.token){
        localStorage.setItem("token", data.token); //yaha change kar
        window.location.href = "/teacher";
      }
      
    } catch (error) {
      console.error("Error",error);
      setMessage("Server error. Try Again Later");
    }
  }
  
  return (
    <section className="flex justify-center items-center w-full h-screen " style={{backgroundImage: "url('/public/pexels-pixabay-276147.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(80%)'}}>
    <div className="flex w-120 flex-row ">
      <Tabs defaultValue="login" value={activeTab} onValueChange={(value)=> setActiveTab(value as "login" | "signup")}>
      
      {/* Login Tab */}
        <TabsContent value="login">

          <Card className="w-120">
            <CardHeader>
              <CardTitle className="w-full flex justify-center text-2xl">Login</CardTitle>
              
            </CardHeader>
            
            <CardContent className="grid gap-6 ">
              <form onSubmit={handlesubmit} autoComplete="off">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Email</Label>
                <Input id="tabs-demo-name" autoComplete="off" placeholder="@gmail.com" className="border-t-0 border-l-0 border-r-0  border-b-2 border-black rounded-none" onChange={(e)=>setEmail(e.target.value)} /><LucideUser className="absolute mt-9 ml-100" size={17}/>
              </div>
              <div className="grid gap-3 mt-8">
                <Label htmlFor="tabs-demo-username">Password <span className="hover:underline hover:cursor-pointer ml-77 ">Forget</span></Label>
                <Input id="tabs-demo-username" autoComplete="new-password" type="password" className="border-t-0 border-l-0 border-r-0  border-b-2 border-black rounded-none" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
              </div>
                 <Button className="cursor-pointer items-center mt-8" type="submit">Log In</Button>
                 </form>
            </CardContent>
         
            
            <CardFooter className="flex flex-col ">
              
              
              <CardDescription className="text-center mt-4">Doesn't have an account?
              <TabsList className="border-none bg-transparent  ">
                <TabsTrigger value="signup" className="-ml-1 cursor-pointer hover:underline">Sign Up</TabsTrigger>
              </TabsList>
              </CardDescription>
              {message && <p className="text-center text-sm text-red-500">{message}</p>}
            </CardFooter>
          </Card>
        </TabsContent>
        

        {/* Sign Up Tab */}
        <TabsContent value="signup">
          <Card className="w-120">
            <CardHeader>
              <CardTitle className="flex justify-center text-2xl">Sign Up </CardTitle>
              
            </CardHeader>
            <CardContent className="grid gap-6">
              <form onSubmit={handlesubmit}>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input id="tabs-demo-current" onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="@gmail.com" className="border-t-0 border-l-0 border-r-0  border-b-2 border-black rounded-none"/> <LucideUser className="absolute mt-9 ml-100" size={17}/>
              </div>
              <div className="grid gap-3 mt-8">
                <Label htmlFor="tabs-demo-new ">Password</Label>
                <Input id="tabs-demo-new" onChange={(e) => setPassword(e.target.value)} type="password" className="border-t-0 border-l-0 border-r-0  border-b-2 border-black rounded-none" placeholder="Password" /> 
              </div>
              <Button type="submit" className="cursor-pointer mt-8"  >Sign Up</Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              
              <CardDescription className="text-center mt-4">Already have an account?
               <TabsList className="border-none bg-transparent  ">
                <TabsTrigger value="login" className="-ml-1 cursor-pointer hover:underline">Log In</TabsTrigger>
         
        </TabsList>
        </CardDescription>
        {message && <p className="text-center text-sm text-red-500">{message}</p>}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
     
    </div>
  
    </section>
  )
}
