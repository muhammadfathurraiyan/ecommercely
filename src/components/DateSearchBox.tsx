"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

type TProduct = {
  setProduct: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        createdAt: Date;
        title: string;
        stock: number;
        sold: number;
        category: string;
      }[]
    >
  >;
  product: {
    id: number;
    createdAt: Date;
    title: string;
    stock: number;
    sold: number;
    category: string;
  }[];
};

export default function DateSearchBox({ setProduct, product }: TProduct) {
  const [toggle, setToggle] = useState(false);
  const [defaultData, setDefaultData] = useState<any>();
  const [dari, setDari] = useState<Date | undefined>(undefined);
  const [sampai, setSampai] = useState<Date | undefined>(undefined);

  const handleDari = (e: ChangeEvent<HTMLInputElement>) => {
    setDari(new Date(e.target.value));
  };

  const handleSampai = (e: ChangeEvent<HTMLInputElement>) => {
    setSampai(new Date(e.target.value));
  };

  const handleFilterDate = () => {
    if (!dari || !sampai) {
      // Jika salah satu atau kedua tanggal tidak dipilih, kembalikan produk ke default
      setProduct(defaultData);
    } else {
      // Filter produk berdasarkan rentang tanggal yang dipilih
      const filteredProducts = defaultData.filter((item: any) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= dari && createdAt <= sampai;
      });
      setProduct(filteredProducts);
    }
  };

  const handleToggleClick = () => {
    if (toggle === true) {
      setProduct(defaultData);
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    setDefaultData(product);
  }, []);

  return (
    <>
      <div
        onClick={handleToggleClick}
        className={`${
          !toggle
            ? "bg-green-700 hover:bg-green-950 border-green-700 hover:border-green-950"
            : "bg-red-700 hover:bg-red-950 mb-16 border-red-700 hover:border-red-950 max-md:mb-[6.5rem]"
        } p-2 duration-300 rounded border`}
      >
        {!toggle ? <FaCalendarAlt /> : <FaTimes />}
      </div>
      <div
        className={`${
          toggle ? "visible opacity-100" : "invisible opacity-0"
        } duration-300 flex items-center max-md:items-end max-md:flex-col gap-2 absolute top-14 z-10 right-0`}
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="title"
              className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
            >
              Dari
            </label>
            <input
              id="dari"
              name="dari"
              type="date"
              onChange={handleDari}
              className="py-1 px-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="stock"
              className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
            >
              Sampai
            </label>
            <input
              id="sampai"
              name="sampai"
              type="date"
              onChange={handleSampai}
              className="py-1 px-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleFilterDate}
          className="py-1 px-4 border border-blue-700 hover:border-blue-950 bg-blue-700 hover:bg-blue-950 duration-300 rounded"
        >
          Cari
        </button>
      </div>
    </>
  );
}
