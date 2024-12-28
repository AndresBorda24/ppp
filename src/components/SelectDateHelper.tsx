import { HelperDates } from "./HelperDates";

interface SelectDateHelperProps {
  date: string | null;
  setDate: (d: string) => void;
}
export const SelectDateHelper: React.FC<SelectDateHelperProps> = ({
  date = null,
  setDate,
}) => {
  return (
    <details className="relative">
      <summary className="list-none h-4 rounded-full bg-neutral-800 text-neutral-300 inline-grid leading-none place-content-center aspect-square cursor-pointer select-none">
        &bull;
      </summary>
      <HelperDates
        defaultDate={date}
        setDate={setDate}
        className="absolute bg-neutral-50 p-2 rounded shadow-lg bottom-full right-0 border border-neutral-200 outline outline-offset-1 outline-1 outline-neutral-300"
      />
    </details>
  );
};
