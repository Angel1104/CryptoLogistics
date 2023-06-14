import React from "react";

const Services = ({
  setCompleteModal,
  setStartModal,
  setCreateShipmentModel,
  setGetModel,
}) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-9 gap-y-10 mx-6">
      <div 
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70"
      onClick={()=>setCreateShipmentModel(true)}
      >
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">1</p>
          <button 
            className="text-white"
          >
            Crear RAM
          </button>
        </div>
      </div>
      <div 
      onClick={()=>setStartModal(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">2</p>
          <button className="text-white">
            Iniciar envio de RAM
          </button>
        </div>
      </div>
      {/* <div className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">3</p>
          <button className="text-white">
            Enviar RAM
          </button>
        </div>
      </div> */}
      <div 
      onClick={()=>setCompleteModal(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">3</p>
          <button className="text-white">
            Envio Completado
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Services;