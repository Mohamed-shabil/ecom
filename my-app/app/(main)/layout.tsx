import React from "react";
import Navbar from "@/components/navbar";
const mainLayout = async ({children}:{children:React.ReactNode;}) => {
    return ( 
        <>  
            <Navbar/>
            <main>
                {children}
            </main>
        </>
     )
}
 
export default mainLayout;