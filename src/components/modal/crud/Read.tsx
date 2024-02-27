type TModal = {
  setAction: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      from: string;
      id: string;
    }>
  >;
};

const Read = ({ setAction }: TModal) => {
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
    </form>
  );
};

export default Read;
