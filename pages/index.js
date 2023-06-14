import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';
//INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  EnvioRamCompleto,
  ConseguirRam,
  IniciarEnvioRam,
} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const index = () => {
  const {
    currentUser,
    crearRam,
    conseguirTodosRam,
    envioRamCompleto,
    conseguirRam,
    iniciarEnvioRam,
    conseguirRamContador,
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createRamModel, setCreateRamModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  //DATA STATE VARIABLE
  const [allRamsdata, setallRamsdata] = useState();

  useEffect(() => {
    const getCampaignsData = conseguirTodosRam();

    return async () => {
      const allData = await getCampaignsData;
      setallRamsdata(allData);
    };
  }, []);

  return (
    <div>
    <Layout>
            <h1 className='text-center text-2xl text-gray-800 font-light mb-4 '>PRODUCTOS</h1>
            <div className="flex justify-around mt-11">
                <div>
                    <button 
                    onClick={()=>setGetModel(true)}
                    className=" text-center bg-blue-500 hover:bg-blue-600 text-xl text-white px-4 py-3 ">
                        Conseguir RAM
                    </button>
                </div>
                {/* <div>
                    <button className=" text-center bg-blue-500 hover:bg-blue-600 text-xl text-white px-4 py-3 ">
                        Contador de RAM
                    </button>
                </div> */}
            </div>
            <div className="flex items-center justify-end mt-9">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none"
                />
                <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Buscar
                </button>
            </div>
            <Table
                setCreateRamModel={setCreateRamModel}
                allRamsdata={allRamsdata}
            />
            <ConseguirRam
                getModel={getModel}
                setGetModel={setGetModel}
                conseguirRam={conseguirRam}
            />
        </Layout>
    </div>
  );
};

export default index;
