import React from "react";

const Table = ({ setCreateShipmentModel, allShipmentsdata}) => {

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  console.log(allShipmentsdata);


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
            {allShipmentsdata?.map((shipment, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.receiver.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(shipment.pickupTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.distance} GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.deliveryTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.isPaid ? " Completed" : "Not Complete"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.status == 0
                    ? "Pending"
                    : shipment.status == 1
                    ? "IN_TRANSIT"
                    : "Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Table;