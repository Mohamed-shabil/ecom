import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
  
export function User() {

    const router = useRouter();

    const [user,setUser] = useState({
      name:'',
      email:'',
      phone:''

    });

    const signOut = async ()=>{
      axios.get('http://localhost:3001/api/users/logout').then(res=>{
        router.refresh();
      })
    } 
    useEffect(()=>{
        axios.get('http://localhost:3001/api/users/currentUser')
        .then(res=>{
            console.log(res);
            setUser(res.data.data)
        }).catch(err=>{
          console.log(err)
        })
    },[])

    return user.name ? (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar>
              <AvatarImage src="#" />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Name : {user?.name}
              </MenubarItem>
              <MenubarItem>
                Email : {user.email}
              </MenubarItem>
              <MenubarItem>
                Phone : {user.phone}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={signOut}>
                <p className="text-rose-500">SignOut</p>
              </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ) : (
    <Button>
        <Link href='/signup'>SignUp</Link>
    </Button>
    )
  }
  