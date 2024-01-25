"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
  } from "@/components/ui/card"
import axios from "axios";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProductsProps{
    name :string;
    image:string;
    price:number;
    productId:string;
    description:string;
    _id:string;
}
const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [open,setOpen] = useState(false)

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:3003/api/cart/show')
        .then((res)=>{
            setCartTotal(res.data.totalCartValue)
            setCart(res.data?.cart);
        })

    },[])
    
    const router = useRouter()
    const removeFromCart = (productId:string) =>{
        axios.post('http://localhost:3003/api/cart/remove',{
                productId
            }).then(res=>{
                console.log('REMOVE RES',res);
                router.refresh()
                setCart(res.data.cart);
                setCartTotal(res.data.totalCartValue)
            }).catch(err=>{
                console.log('REMOVE ERR',err);
        })
    }
    
    const createOrder = () => {
        axios.post('http://localhost:3003/api/cart/createOrder',)
        .then((res)=>{
            setCart([]);
            setCartTotal(0);
            router.push('/orders');
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.status === 404){
                setOpen(true);
            }
        })
    }



    const {toast} = useToast();

    const formSchema = z.object({
        name:z.string().min(3,{
            message:'Name must be 3 characters long'
        }),
        address:z.string().min(4,{
            message:""
        }),
        city:z.string().min(3,{
            message:"City must be more than 3 characters long"
        }),
        locality:z.string().min(3,{
            message:"Locality must be more than 3 characters long"
        }),
        pin:z.string().min(6,{
            message:"Pin must be 6 characters long"
        }).max(6,{
            message:"Pin cant be 6 characters long"
        }),
        phone:z.string().min(10,{
            message:'phone number must be 10 numbers long'
        }).max(10,{
            message:"phone number can't be 10 numbers long"
        })
    });

    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            address:"",
            city:"",
            locality:'',
            phone:"",
            pin:""
        }
    })

    const onSubmit = async(values : z.infer<typeof formSchema>)=>{
        console.log('FORM VALUES :=',values);
        axios.post('http://localhost:3003/api/address/new',values).then(res=>{
            console.log(res);
            handleClose();
        }).catch(err=>{
            toast({
                variant: "destructive",
                title: err.response.data.error,
            })
        })
    }
    
    const handleClose = ()=>{
        form.reset();
        setOpen(false);
    }
    
    const isLoading = form.formState.isSubmitting;



    return cart.length ? ( 

        <main className="flex felx-1 flex-row container justify-between">


            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Address</DialogTitle>
                    </DialogHeader>
                    

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="locality"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Locality</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your locality" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pin</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Location Pin"{...field} />
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
                                            <Input placeholder="Enter phone number"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-4 cursor-pointer" disabled={isLoading}>
                                Save
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>




            <div className="flex flex-col">
                {cart.map((product:ProductsProps)=>(
                    <div className="mt-7" key={product._id}>
                        <Card className="w-[800px] flex flex-row text-2xl">
                            <div className="p-2 w-[150px]">
                                <Image src={`http://localhost:3002/${product.image}`} width={180} height={180} alt={product.name}/>
                            </div>
                            <div className="p-2 text-wrap w-[650px]">
                                <div className="flex justify-between">
                                    <h1 className="font-medium">{product.name}</h1>
                                    <Button variant="ghost" onClick={()=>removeFromCart(product.productId)}><XCircle/></Button>
                                </div>
                                <CardDescription className="my-3">
                                    {product.description}
                                </CardDescription>
                                <h1 className="font-medium text-2xl">$ {product.price}</h1>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="w-2/6 mt-7 rounded-md p-5 min-h-fit shadow-xl border">
                <h2 className="font-medium text-2xl">Order Summary</h2>
                <div className="px-5 py-3" >
                    <ol className="list-decimal">
                        {cart.map((product:ProductsProps)=>(
                            <>
                                <li className="flex justify-between my-2">
                                    <h3>{product.name}</h3>
                                    <h3>$ {product.price}</h3>
                                </li>
                                <Separator/>
                            </>
                        ))}
                        <li className="flex justify-between my-2 mt-12">
                            <h3>Total</h3>
                            <h3>$ {cartTotal}</h3>
                        </li>

                        <Separator/>
                    </ol>
                </div>
                <Button className="relative botom-0 w-full" onClick={createOrder}>Order Now</Button>
            </div>
        </main>
    ) : (<h2 className="text-center mt-52 text-2xl"> Your cart is empty</h2>)
}
export default CartPage;