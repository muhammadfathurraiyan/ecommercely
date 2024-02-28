import React from "react";
import Link from "next/link";
import Table from "@/components/Table";

export const revalidate = 0;

export default async function page() {
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();
  return (
    <main className="grid grid-cols-8 min-h-screen">
      <div className="col-span-2 bg-neutral-900 h-screen relative">
        <div className="absolute inset-0 p-8 h-screen flex flex-col justify-between">
          <h1 className="font-bold text-2xl">Commercely.</h1>
          <p className="text-xs items-center">
            &copy; Commercely. all right reserved. <br />
            Site design by:{" "}
            <Link
              href="https://muhammadfathurraiyan.site"
              className="text-green-500 hover:text-green-600 duration-300"
              target="_blank"
            >
              Raiyan.
            </Link>
          </p>
        </div>
      </div>
      <div className="col-span-6 relative">
        <div className="p-8 absolute inset-0 overflow-auto scrollbar-hide flex flex-col gap-8">
          <Table data={data} />
        </div>
      </div>
    </main>
  );
}
