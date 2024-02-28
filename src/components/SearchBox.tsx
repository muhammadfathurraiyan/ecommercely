import { ChangeEvent, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

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

export default function SearchBox({ setProduct, product }: TProduct) {
  const [defaultData, setDefaultData] = useState<any>();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText === "") {
      setProduct(defaultData);
    } else {
      const filteredResults = defaultData.filter(
        (item: any) =>
          item.title.toLowerCase().includes(searchText) ||
          item.sold.toString().toLowerCase().includes(searchText) ||
          item.stock.toString().toLowerCase().includes(searchText) ||
          item.category.toString().toLowerCase().includes(searchText)||
          item.createdAt.toString().toLowerCase().includes(searchText)
      );
      setProduct(filteredResults);
    }
  };

  useEffect(() => {
    setDefaultData(product);
  }, []);

  return (
    <form action="" className="flex items-center gap-2 relative">
      <input
        id="title"
        name="title"
        type="text"
        onChange={(e) => handleSearch(e)}
        className="pl-8 pr-2 py-1 rounded bg-transparent border border-neutral-500 focus:border-neutral-400 duration-300 outline-none"
      />
      <div className="absolute left-2">
        <FaMagnifyingGlass />
      </div>
    </form>
  );
}
