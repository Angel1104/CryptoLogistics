import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';

import {
    Table,
    Form,
    Services,
    Profile,
    CompleteShipment,
    GetShipment,
    StartShipment,
  } from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const IniciarProceso = () => {

    const {
        currentUser,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
      } = useContext(TrackingContext);

    //STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  //DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    };
  }, []);


    return ( 
    <Layout>
        <h1 className='text-center text-2xl text-gray-800 font-light mb-4 '>CADENA DE SUMINISTRO</h1>
        <Services
        setCompleteModal={setCompleteModal}
        setStartModal={setStartModal}
        setCreateShipmentModel={setCreateShipmentModel}
        />
        <Form
            createShipmentModel={createShipmentModel}
            createShipment={createShipment}
            setCreateShipmentModel={setCreateShipmentModel}
        />
        
        <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
        <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
        <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
        <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />
    </Layout>
    );
}
 
export default IniciarProceso;