"use client"
import { useEffect, useState } from "react";

type TModal = {
  setAction: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      from: string;
      id: string;
    }>
  >;
  action: {
    status: boolean;
    from: string;
    id: string;
  };
};

const Read = ({ setAction, action }: TModal) => {
  const [data, setData] = useState({
    id: "",
    createdAt: "" as unknown as Date,
    title: "",
    stock: "",
    sold: "",
    category: "",
  });

  useEffect(() => {
    fetch(`https://commercely-mfr.vercel.app/api?id=${action.id}`)
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);
  
  const formatDate = (data: Date) => {
    const result = new Date(data);
    const year = result.getFullYear();
    const rawMonth = result.getMonth() + 1;
    const month =
      rawMonth.toString().charAt(0) !== "0"
        ? "0" + rawMonth.toString()
        : rawMonth;
    const day = result.getDate();
    const date = `${day} - ${month} - ${year}`;
    return date;
  };

  return (
    <form action="" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="title"
            className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
          >
            Nama Barang :
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={data.title}
            disabled
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="stock"
            className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
          >
            Stok :
          </label>
          <input
            id="stock"
            name="stock"
            type="text"
            value={data.stock}
            disabled
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="sold"
            className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
          >
            Jumlah Terjual :
          </label>
          <input
            id="sold"
            name="sold"
            type="text"
            value={data.sold}
            disabled
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="date"
            className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
          >
            Tanggal transaksi :
          </label>
          <input
            id="date"
            name="date"
            type="text"
            value={formatDate(data.createdAt)}
            disabled
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="category"
            className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
          >
            Jenis Barang :
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={data.category}
            disabled
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
      </div>
      <div className="flex gap-4 items-center justify-end">
        <div
          onClick={() => setAction({ status: false, from: "", id: "" })}
          className="py-2 w-fit cursor-pointer px-4 bg-neutral-700 rounded hover:bg-neutral-900 duration-300"
        >
          Close
        </div>
      </div>
    </form>
  );
};

export default Read;
