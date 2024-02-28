"use client";
import { ProductSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type TModal = {
  setAction: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      from: string;
      id: string;
    }>
  >;
};

const Create = ({ setAction }: TModal) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const formAction = async (data: FormData) => {
    const newProduct = {
      title: data.get("title"),
      stock: data.get("stock") as unknown as number,
      sold: data.get("sold") as unknown as number,
      category: data.get("category"),
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
      redirect: "follow",
    };

    const response = await fetch("http://localhost:3000/api", requestOptions);
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
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-red-600 text-xs">{error}</p>
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
            type="number"
            className="p-2 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sold"
            className="text-xs absolute p-1 bg-neutral-800 rounded -top-3 left-2"
          >
            Jumlah Terjual :
          </label>
          <input
            id="sold"
            name="sold"
            type="number"
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
        <button className="py-2 w-fit cursor-pointer px-4 bg-green-700 rounded hover:bg-green-950 duration-300">
          Tambah
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Create;
