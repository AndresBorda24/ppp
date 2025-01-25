import { useEffect, useRef } from "react";

import { useOnClickOutside } from "usehooks-ts";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClickOutside?: (
    e: MouseEvent | TouchEvent | FocusEvent
  ) => void | undefined;
  onEscape?: (e: KeyboardEvent) => void;
}
export const ContentWrapper: React.FC<Props> = ({
  onClickOutside,
  onEscape,
  className = "",
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleOnClickOutside = (e: MouseEvent | TouchEvent | FocusEvent) => {
    if (onClickOutside) onClickOutside(e);
  };

  useOnClickOutside(wrapperRef, handleOnClickOutside);
  useEffect(() => {
    if (! onEscape) return;

    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key!== "Escape") return;
      if (wrapperRef.current?.contains(document.activeElement)) {
        (document.activeElement as HTMLElement).blur();
        return;
      }

      onEscape(e);
    };

    document.addEventListener("keyup", escapeHandler);
    return () => {
      document.removeEventListener("keyup", escapeHandler);
    };
  }, [onEscape]);

  return <div ref={wrapperRef} className={className} {...props}></div>;
};
