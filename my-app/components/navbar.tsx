"use client"

import Link from "next/link";
import {ModeToggle} from '@/components/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { ShoppingBasket } from "lucide-react";
import Cart from "@/components/cart";
const Navbar = () => {
    return (
        <header>
            <nav className="flex items-center justify-between p-4 px-10 bg:background">
                <div className="flex items-center">
                    <span className="text-xl font-bold">Ecom</span>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="#" className="hover:text-gray-400">Home</Link>
                    <Cart />
                    <Link href="#" className="hover:text-gray-400">Orders</Link>
                    <Link href="#" className="hover:text-gray-400">SignOut</Link>
                    <ModeToggle/>
                </div>
            </nav>
            <Separator/>
        </header> 
    );
}
 
export default Navbar;