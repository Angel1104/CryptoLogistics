import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';
//INTERNAL IMPORT
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

const index = () => {
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
                setCreateShipmentModel={setCreateShipmentModel}
                allShipmentsdata={allShipmentsdata}
            />
            <GetShipment
              getModel={getModel}
              setGetModel={setGetModel}
              getShipment={getShipment}
            />
        </Layout>
    </div>
  );
};

export default index;
