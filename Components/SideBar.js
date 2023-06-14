import React from "react";
import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

const SideBar = (setOpenProfile) => {
  const [state, setState] = useState(false);

  const {
    currentUser,
    connectWallet
  } = useContext(TrackingContext);

  //routing de next
  const router = useRouter();
  const path = router.pathname;
  const home = () => {
    var resh;
    if ( path === "/" || path === "/tablarams") {
        resh = true
    } else {
        resh = false
    }
  return resh
  };
  const proceso = () => {
    var resp;
    if ( path === "/iniciarproceso") {
        resp = true
    } else {
        resp = false
    }
    return resp
  };

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 flex flex-col">
      <div>
        <p className='text-white text-2xl font-black text-center'>CryptoLogistics</p>
      </div>
      <div className="mb-5 mt-9">
        {currentUser ? (
          <p className=" bg-blue-800  text-white px-4 py-3 w-full">
            {currentUser.slice(0, 25)}..
          </p>
        ) : (
          <button
            onClick={() => connectWallet()}
            className="text-center bg-blue-500 hover:bg-blue-600 text-xl text-white px-4 py-3 w-full"
          >
            Connectar Billetera
          </button>
        )}
      </div>
      <hr className="my-4"/>
      <nav className='mt-5 list-none mb-12'>
          <li className={home() ? "bg-blue-800" : " hover:bg-blue-500 hover:text-gray-800 "}>
            <Link href="/" className="block py-2 px-4 text-white text-xl ">
                  Producto
            </Link>
          </li>
          <li className={proceso() ? "bg-blue-800" : "hover:bg-blue-500 hover:text-gray-800"}>
            <Link href="/iniciarproceso" className="block py-2 px-4 text-white text-xl">
                Iniciar proceso
            </Link>
          </li>
      </nav>
      <div className="mt-auto">
        
        <button 
        onClick={()=>setOpenProfile(true)}
        className=" text-center bg-blue-500 hover:bg-blue-600 text-xl text-white px-4 py-3 w-full">
          Perfil del usuario
        </button>

      </div>
    </aside>
  );
};

export default SideBar;