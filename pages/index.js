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
      <Services
        setCompleteModal={setCompleteModal}
        setStartModal={setStartModal}
        setCreateRamModel={setCreateRamModel}
      />

      <Table
        setCreateRamModel={setCreateRamModel}
        allRamsdata={allRamsdata}
      />
      <Form
        createRamModel={createRamModel}
        crearRam={crearRam}
        setCreateRamModel={setCreateRamModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        conseguirRamContador={conseguirRamContador}
      />
      <EnvioRamCompleto
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        envioRamCompleto={envioRamCompleto}
      />
      <ConseguirRam
        getModel={getModel}
        setGetModel={setGetModel}
        conseguirRam={conseguirRam}
      />
      <IniciarEnvioRam
        startModal={startModal}
        setStartModal={setStartModal}
        iniciarEnvioRam={iniciarEnvioRam}
      />
      </Layout>
    </div>
  );
};

export default index;
