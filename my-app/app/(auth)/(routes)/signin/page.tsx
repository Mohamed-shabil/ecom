"use client"

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button";  
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"

const signin = () => {  


    const {toast} = useToast();
    const formSchema = z.object({
        email:z.string().email({
            message:'Invalid email format'
        }),
        password:z.string().min(4,{})
    })
    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })
    const isLoading = form.formState.isSubmitting;
    const router = useRouter()
    const onSubmit = async(values : z.infer<typeof formSchema>)=>{
        try {
            console.log('FORM VALUES :=',values);
            
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/api/users/signin',values).then(res=>{
                return router.push('/')
            }).catch(err=>{
                console.log('errrprrprprpprprprp',err)
                toast({
                    variant: "destructive",
                    title: "Uh oh! "+err,
                })
            })

        }catch (err) {
            console.log(err)
        }

        
    }

    return ( 
        <div className="h-screen flex items-center justify-center">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Signin</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px]">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-4" disabled={isLoading}>
                                Signin
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );}
 
export default signin;