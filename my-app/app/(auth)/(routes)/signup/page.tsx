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
import { useRouter,useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";

const signin = () => {  
    const formSchema = z.object({
        email:z.string().email({
            message:'Invalid email format'
        }),
        password:z.string().min(4,{
            message:"Password must be 4 characters long"
        }),
        name:z.string().min(3,{
            message:"Username must be 4 characters long"
        }),
        phone:z.string().min(10,{
            message:"Phone number must be 10 numbers long"
        }).max(10,{
            message:"Phone number can't be morethan 10 numbers long"
        }),
        ConfirmPassword:z.string().min(4,{
            message:"Password must be 4 characters long"
        }),

    });
    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
            name:"",
            phone:'',
            ConfirmPassword:""
        }
    })
    
    const isLoading = form.formState.isSubmitting;
    const router = useRouter();

    const {toast} = useToast();
    const onSubmit = async(values : z.infer<typeof formSchema>)=>{
        console.log('FORM VALUES :=',values);
        axios.post('http://localhost:3001/api/users/signup',values).then(res=>{
            return router.push('/')
        }).catch(err=>{
            toast({
                variant: "destructive",
                title: err.response.data.error,
            })
        })
        
    }

    return ( 
        <div className="h-screen flex items-center justify-center">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>SignUp</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px]">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
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
                                            <Input placeholder="enter your password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="ConfirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="confirm password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-4 cursor-pointer" disabled={isLoading}>
                                SignUp
                            </Button>
                        </form>
                    </Form>
                    <p className="text-center text-sky-500 pt-5"><Link href="/signin">Signin</Link></p>
                </CardContent>
            </Card>
        </div>
    );}
 
export default signin;