import { RequestFormError } from "../types";
import { useEffect } from "react";

interface Props {
  errors: RequestFormError;
  className?: string;
  fieldErros?: boolean;
}
export const ShowRequestErrors: React.FC<Props> = ({
  errors,
  className = "",
  fieldErros = false,
}) => {
  useEffect(() => {
    if (errors.fields) {
      Object.entries(errors.fields).forEach(([fieldName, fieldErrors]) => {
        const input = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
        input.classList.add('error-input')
      });
    }
  }, [fieldErros, errors])
  return (
    <div className={`bg-red-50 flex flex-col border-l-4 border-red-800 p-2 rounded-r text-sm ${className}`}>
      <span className="font-bold text-red-900 blockn leading-none">Error:</span>
      <p className="text-red-800">{errors.error}</p>
    </div>
  );
};
