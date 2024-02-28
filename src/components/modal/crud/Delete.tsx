"use client";
import { useRouter } from "next/navigation";
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

const Delete = ({ setAction, action }: TModal) => {
  const router = useRouter();
  const deleteAction = async (data: FormData) => {
    const id = data.get("id");
    const requestOptions: Object = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://commercely-mfr.vercel.app/api?id=${id}`,
      requestOptions
    );

    const result = await response.json();
    if (result?.message) {
      toast.success(result.message, {
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
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold -mt-4">
        Apakah anda yakin ingin menghapus data ini?
      </h1>
      <div className="flex gap-4 items-center justify-end">
        <div
          onClick={() => setAction({ status: false, from: "", id: "" })}
          className="py-2 w-fit cursor-pointer px-4 bg-neutral-700 rounded hover:bg-neutral-900 duration-300"
        >
          Cancel
        </div>

        <form action={deleteAction}>
          <input type="hidden" name="id" value={action.id} />
          <button className="py-2 w-fit cursor-pointer px-4 bg-red-700 rounded hover:bg-red-950 duration-300">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default Delete;
