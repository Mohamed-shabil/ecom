import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
const Cart = () => {
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3003/api/cart/show').then(res=>{
            setCart(res.data.cart)
        }).catch((err)=>{
            if(err.status === 401){
                setCart([]);
            }
        })
    },[])

    return ( <div className="flex align-middle"><ShoppingCart />{cart.length}</div> );
}
 
export default Cart;