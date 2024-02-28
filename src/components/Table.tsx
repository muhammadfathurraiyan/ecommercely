"use client";
import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Modal from "./modal";
import SearchBox from "./SearchBox";
import DateSearchBox from "./DateSearchBox";

type TData = {
  data: {
    id: number;
    createdAt: Date;
    title: string;
    stock: number;
    sold: number;
    category: string;
  }[];
};

export default function Table({ data }: TData) {
  const [action, setAction] = useState({ status: false, from: "", id: "" });
  const [product, setProduct] = useState(data);

  const formatDate = (data: Date) => {
    const result = new Date(data);
    const year = result.getFullYear();
    const rawMonth = result.getMonth() + 1;
    const month = rawMonth.toString().length === 1 ? "0" + rawMonth : rawMonth;
    const day = result.getDate();
    const date = `${day} - ${month} - ${year}`;
    return date;
  };

  
  // untuk terbesar dan terkecil
  const handleStock = () => {};

  // untuk terbesar dan terkecil
  const handleSold = () => {};

  // untuk ascending dan descending
  const handleTitle = () => {};

  // untuk terlama dan terbaru
  const handleTanggalTransaksi = () => {};

  // untuk ascending dan descending
  const handleCategory = () => {};

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Product</h1>
        <p>Table of Products.</p>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-start justify-between w-full">
          <button
            onClick={() =>
              setAction({ status: !action.status, from: "tambah", id: "" })
            }
            className="py-2 px-4 bg-green-700 rounded hover:bg-green-950 duration-300"
          >
            Tambah
          </button>
          <div className="flex items-start gap-4 relative">
            <SearchBox setProduct={setProduct} product={product} />
            <DateSearchBox setProduct={setProduct} product={product} />
          </div>
        </div>
        <div className="relative w-full overflow-x-auto shadow-md rounded-t">
          <table className="w-full text-sm text-center">
            <thead className="text-xs uppercase bg-neutral-900">
              <tr>
                <th className="px-6 py-3">No</th>
                <th onClick={handleTitle} className="px-6 py-3">
                  Nama Barang
                </th>
                <th onClick={handleStock} className="px-6 py-3 cursor-pointer">
                  Stock
                </th>
                <th onClick={handleSold} className="px-6 py-3 cursor-pointer">
                  Jumlah Terjual
                </th>
                <th
                  onClick={handleTanggalTransaksi}
                  className="px-6 py-3 cursor-pointer"
                >
                  Tanggal Transaksi
                </th>
                <th
                  onClick={handleCategory}
                  className="px-6 py-3 cursor-pointer"
                >
                  Jenis Barang
                </th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={product.id} className="border-b border-neutral-600">
                  <th className="px-6 py-3">{index + 1}</th>
                  <td className="px-6 py-3">{product.title}</td>
                  <td className="px-6 py-3">{product.stock}</td>
                  <td className="px-6 py-3">{product.sold}</td>
                  <td className="px-6 py-3">{formatDate(product.createdAt)}</td>
                  <td className="px-6 py-3">{product.category}</td>
                  <td className="px-6 py-3 flex items-center gap-1">
                    <div
                      onClick={() =>
                        setAction({
                          status: !action.status,
                          from: "lihat",
                          id: product.id.toString(),
                        })
                      }
                      className="p-1 bg-green-700 hover:bg-green-950 duration-300 rounded"
                    >
                      <FaEye />
                    </div>
                    <div
                      onClick={() =>
                        setAction({
                          status: !action.status,
                          from: "edit",
                          id: product.id.toString(),
                        })
                      }
                      className="p-1 bg-blue-700 hover:bg-blue-950 duration-300 rounded"
                    >
                      <FaPen />
                    </div>
                    <div
                      onClick={() =>
                        setAction({
                          status: !action.status,
                          from: "hapus",
                          id: product.id.toString(),
                        })
                      }
                      className="p-1 bg-red-700 hover:bg-red-950 duration-300 rounded"
                    >
                      <FaTrash />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal setAction={setAction} action={action} />
    </>
  );
}
