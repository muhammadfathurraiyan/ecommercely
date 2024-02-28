"use client";
import { ProductSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const Update = ({ setAction, action }: TModal) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    id: "",
    createdAt: "" as unknown as Date,
    title: "",
    stock: "",
    sold: "",
    category: "",
  });

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, title: e.target.value });
  };

  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, stock: e.target.value });
  };

  const handleSold = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, sold: e.target.value });
  };

  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, category: e.target.value });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api?id=${action.id}`)
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  const updateAction = async (data: FormData) => {
    const newProduct = {
      title: data.get("title"),
      stock: data.get("stock"),
      sold: data.get("sold"),
      category: data.get("category"),
      id: data.get("id"),
    };

    const result = ProductSchema.safeParse(newProduct);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      setError(errorMessage);
      return;
    }

    const requestOptions: Object = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    };

    const response = await fetch(`http://localhost:3000/api`, requestOptions);
    const newResponse = await response.json();

    if (newResponse?.message) {
      toast.success(newResponse.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (newResponse?.message.includes("error")) {
      toast.error(newResponse.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setAction({ status: false, from: "", id: "" });
    router.refresh();
  };

  return (
    <form action={updateAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-red-600 text-xs">{error}</p>
        <div className="flex flex-col gap-1 relative">
          <input type="hidden" name="id" value={data.id} />
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
            onChange={handleTitle}
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
            onChange={handleStock}
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
            onChange={handleSold}
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
            onChange={handleCategory}
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
      </div>
      <div className="flex gap-4 items-center justify-end">
        <div
          onClick={() => setAction({ status: false, from: "", id: "" })}
          className="py-2 w-fit cursor-pointer px-4 bg-neutral-700 rounded hover:bg-neutral-900 duration-300"
        >
          Cancel
        </div>
        <button className="py-2 w-fit cursor-pointer px-4 bg-blue-700 rounded hover:bg-blue-950 duration-300">
          Update
        </button>
      </div>
    </form>
  );
};

export default Update;
