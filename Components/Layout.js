import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head';
import SideBar from './SideBar';
import { TrackingContext } from "../Conetxt/TrackingContext";


const Layout = ({children}) => {
    
      //STATE VARIABLE
      const [openProfile, setOpenProfile] = useState(false);

    return ( 
        <>
            <Head>
                <title>OnlyOfers</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
            </Head>
            <div className='bg-gray-200 min-h-screen'>
                <div className='flex min-h-screen'>
                <SideBar
                    setOpenProfile={setOpenProfile}
                />
                <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                    {children} 
                </main>
                 
                </div>
            </div>
            
        </>
     );
}
 
export default Layout;