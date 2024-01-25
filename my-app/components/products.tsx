
"use client"
import { useToast } from "@/components/ui/use-toast"
import { useState,useEffect } from "react";
import axios from "axios";
import Image from "next/image"
import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ToastAction } from "./ui/toast";

interface productsProps{
    _id:string;
    name:string;
    price:number;
    description:string;
    image:string;

}

const ShowProducts = () => {

    const router = useRouter();
    const { toast } = useToast()
    const [ products,setProducts ] = useState([]);
    const [ loading,SetLoading ] = useState(true);
    useEffect(()=>{
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3002/api/products/show').then((res)=>{
          console.log(res);
          setProducts(res.data?.products);
        })
        SetLoading(false)
    },[])
  
    const addToCart = async (product:productsProps)=>{
        axios.post('http://localhost:3003/api/cart/add',{
            product
        }).then((res)=>{
          toast({
            variant:"default",
            title: "Item Added to cart",
            description: product.name,
            action:<ToastAction altText="Try again"><Link href='/cart'>checkout</Link></ToastAction>
          })
          console.log(res);
        }).catch(err=>{
          console.log(err)
           if(err.response.status === 401){
              router.push('/signup?fromCart=true');
           }
           if(err.response.status === 400){
              toast({
                variant:"destructive",
                title: "Item already in cart",
                description: product.name,
              })
           }
        })
    }


    return ( 
        <main className="container ">
        <div className=" flex align-middle justify-center flex-wrap min-h-screen">
          { products.length ? 
              products.map((product:productsProps)=>(
                  <div key={product._id} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border shadow-md">
                    <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                      <Image className="object-cover" src={`http://localhost:3002/${product.image}`} width={300} height={300} alt="product image" />
                    </Link>
                    <div className="mt-4 px-5 pb-5">
                      <Link href="#">
                        <h5 className="text-xl tracking-tight ">{product.name}</h5>
                      </Link>
                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-3xl font-bold ">${product.price}</span>
                        </p>
                      </div>
                      <Button onClick={()=>{addToCart(product)}}  className="flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium  focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <ShoppingCart />
                        Add to cart
                      </Button>
                    </div>
                  </div>
            )) 
            : ( <Loader2 className=" animate-spin"/> )
          }
          </div>
      </main>
     );
    
}
 
export default ShowProducts;