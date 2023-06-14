import React from "react";

const Table = ({ setCreateRamModel, allRamsdata }) => {

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  console.log(allRamsdata);


  return (
    <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Recevier</th>
              <th className="py-3 px-6">Fecha</th>
              <th className="py-3 px-6">Almacenamiento</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6">Fecha Entrga</th>
              <th className="py-3 px-6">Pago</th>
              <th className="py-3 px-6">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allRamsdata?.map((ram, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.receiver.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fecha)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.almacenamiento} GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.precio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.fechaEntrega}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.pago ? " Completed" : "Not Complete"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.estado == 0
                    ? "ENSAMBLADO"
                    : ram.estado == 1
                    ? "EN_TRANSITO"
                    : "ENTREGADO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Table;