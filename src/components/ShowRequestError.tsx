import { useEffect, useState } from "react";

import { RequestFormError } from "../types";
import { Tooltip } from "react-tooltip";
import { toast } from "sonner";

interface Props {
  errors: RequestFormError;
  className?: string;
  fieldErrors?: boolean;
}
export const ShowRequestErrors: React.FC<Props> = ({
  errors,
  fieldErrors = false,
}) => {
  const [tooltips, setTooltips] = useState<React.ReactNode>(null);

  useEffect(() => {
    document
      .querySelectorAll(".form-field-error")
      .forEach((el) => el.classList.remove("form-field-error"));
    toast.error(errors.error);

    if (fieldErrors && errors.fields) {
      const newTooltips = Object.entries(errors.fields).map(
        ([fieldName, fieldValErrors], i) => {
          document
            .querySelector(`[name="${fieldName}"]`)
            ?.classList.add("form-field-error");

          return (
            <Tooltip
              anchorSelect={`[name="${fieldName}"]`}
              variant="error"
              key={`${fieldName}-${i}`}
            >
              <ul className="list-disc pl-3">
                {fieldValErrors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </Tooltip>
          );
        }
      );
      setTooltips(newTooltips);
    } else setTooltips(null);
  }, [errors, fieldErrors]);

  return tooltips;
};
