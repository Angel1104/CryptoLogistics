import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';

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

const IniciarProceso = () => {

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
    <Layout>
        <h1 className='text-center text-2xl text-gray-800 font-light mb-4 '>CADENA DE SUMINISTRO</h1>
        <Services
        setCompleteModal={setCompleteModal}
        setStartModal={setStartModal}
        setCreateRamModel={setCreateRamModel}
        />
        <Form
            createRamModel={createRamModel}
            crearRam={crearRam}
            setCreateRamModel={setCreateRamModel}
        />
    </Layout>
    );
}
 
export default IniciarProceso;