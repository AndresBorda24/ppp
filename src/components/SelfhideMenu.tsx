import { useRef, useState } from "react";

import { ContentWrapper } from "./ContentWrapper";
import { usePreventScroll } from "../hooks/usePreventScroll";

interface Props {
  children: React.ReactNode;
}
export const SelfhideMenu: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleOnClickOutside = (e: MouseEvent | TouchEvent | FocusEvent) => {
    if (e.target === buttonRef.current) return;
    setShow(false);
  }

  usePreventScroll(show);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="grid place-content-center h-6 w-6 border border-white rounded-full bg-white hover:bg-neutral-50 hover:border-neutral-100"
        onClick={() => setShow(!show)}
      >:</button>
      {show && (
        <ContentWrapper
          role="menu"
          onClickOutside={handleOnClickOutside}
          className="py-2 rounded-lg shadow-sm border border-neutral-100 bg-white absolute top-0 right-full mr-1 min-w-32"
        >{children}</ContentWrapper>
      )}
    </div>
  );
}
