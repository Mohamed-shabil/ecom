"use client"
import axios from 'axios';
import { useEffect,useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from 'next/image';

interface OrderProp {
    orderId:string;
    orderDate:string;
    products:[
        {
            name:string;
            price:string;
            description:string;
            image:string;
            productId:string;
        }
    ],
    status:string,
    userId:string;
    totalPrice:number;
}

const Orders = () => {
    axios.defaults.withCredentials = true;
    const [order,setOrder] = useState([]);
    const [cartValue,setCartValue] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:3004/api/order/show')
        .then((res)=>{
            setCartValue(res.data.totalCartValue);
            setOrder(res.data.orders);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return ( 
        <div className='container pt-8 w-full'>
            <div className=' min-h-24'>
                {order.map((item:OrderProp,i)=>(
                    <div className='w-full mb-5 rounded-md shadow-lg border' key={i}>
                        <p className='text-xs ml-6 mt-3'>Order Id : <span className='font-mono'>{item.orderId}</span></p>
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Order Date</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {item.products.map((product,i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-light font-mono">
                                        <Image src={`http://localhost:3002/${product.image}`} alt={product.name} width={100} height={100}/>
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{item.orderDate}</TableCell>
                                    <TableCell><p className='text-base'>$ {product.price}</p></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                <TableCell colSpan={3} className="text-lg">Total</TableCell>
                                <TableCell className="text-center text-lg">${item.totalPrice}</TableCell>
                                </TableRow>
                            </TableFooter>
                            </Table>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Orders;
