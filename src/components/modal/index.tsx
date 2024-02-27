import Create from "./crud/Create";

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
export default function Modal({ setAction, action }: TModal) {
  return (
    <section
      className={`${
        action.status ? "visible opacity-100" : "invisible opacity-0"
      } duration-500 fixed inset-0 flex items-center justify-center bg-neutral-950/80`}
    >
      <div
        className={`${
          action.status ? "translate-y-0" : "translate-y-10"
        } p-8 bg-neutral-800 rounded-lg duration-300 w-[40vw] flex flex-col gap-8`}
      >
        <div>
          <h1 className="font-bold text-2xl">Form {action.from}</h1>
          <p>Form untuk {action.from} product</p>
        </div>
        <Create setAction={setAction} />
      </div>
    </section>
  );
}
