import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import tracking from "../Conetxt/Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
//STATE VARIABLE
const DappName = "Product Tracking RAM";
const [currentUser, setCurrentUser] = useState("");

const crearRam = async (items) => {
    console.log(items);
    const { receiver, fecha, almacenamiento, precio } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.crearRam(
        receiver,
        new Date(fecha).getTime(),
        almacenamiento,
        ethers.utils.parseUnits(precio, 18),
        {
          value: ethers.utils.parseUnits(precio, 18),
        }
      );
      console.log("se creo todo normal")
      await createItem.wait();
      console.log(createItem);
      location.reload();
      
    } catch (error) {
      console.log("Algo anda mal", error);
    }
  };

const conseguirTodosRam = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      console.log("aca");
      const rams = await contract.getAllTransaccions();
      console.log("aca");

      const todasRams = rams.map((ram) => ({
        sender: ram.sender,
        receiver: ram.receiver,
        precio: ethers.utils.formatEther(ram.precio.toString()),
        fecha: ram.fecha.toNumber(),
        fechaEntrega: ram.fechaEntrega.toNumber(),
        almacenamiento: ram.almacenamiento.toNumber(),
        pagado: ram.pagado,
        estado: ram.estado,
      }));
      
      return todasRams;
      
    } catch (error) {
      console.log("error, consuguiendo las ram");
    }
};

const conseguirRamContador = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const ramsContadas = await contract.conseguirRamContador(accounts[0]);
      return ramsContadas.toNumber();
    } catch (error) {
      console.log("error, consiguiendo contador de rams");
    }
  };


const envioRamCompleto = async (envioRamCompleto) => {
    console.log(envioRamCompleto);

    const { recevier, index } = envioRamCompleto;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.envioRamCompleto(
        accounts[0],
        recevier,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("wrong envio Ram Completo", error);
    }
  };

const conseguirRam = async (index) => {
    console.log(index * 1);
    try {
      console.log("aca")
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      console.log(contract)
      const ram = await contract.conseguirRam(accounts[0], index * 1);
      
      console.log("aca2")
      const SoloRam = {
        sender: ram[0],
        receiver: ram[1],
        fecha: ram[2].toNumber(),
        fechaEntrega: ram[3].toNumber(),
        almacenamiento: ram[4].toNumber(),
        precio: ethers.utils.formatEther(ram[5].toString()),
        estado: ram[6],
        pagado: ram[7],
      };
      
      return SoloRam;
    } catch (error) {
      console.log("no hay ram");
    }
  };

const iniciarEnvioRam = async (getProduct) => {
    const { reveiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const ram = await contract.iniciarEnvioRam(
        accounts[0],
        reveiver,
        index * 1,
        {
          gasLimit: 300000,
        }
      );

      ram.wait();
      console.log(ram);
      location.reload();
    } catch (error) {
      console.log("no hay ram", error);
    }
  };

//---CHECK WALLET CONNECTED
const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      return "not connected";
    }
  };

  //---CONNET WALLET FUNCTION
const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something want wrong";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        crearRam,
        conseguirTodosRam,
        envioRamCompleto,
        conseguirRam,
        iniciarEnvioRam,
        conseguirRamContador,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};