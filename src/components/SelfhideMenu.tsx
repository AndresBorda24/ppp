import { useRef, useState } from "react";

import { ContentWrapper } from "./ContentWrapper";
import { usePreventScroll } from "../hooks/usePreventScroll";

interface Props {
  children: React.ReactNode;
}
export const SelfhideMenu: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false);
  usePreventScroll(show);

  return (
    <div className="relative">
      <button className="grid place-content-center h-6 w-6 border border-white rounded-full bg-white hover:bg-neutral-50 hover:border-neutral-100" onClick={() => setShow(true)}>:</button>
      {show && (
        <ContentWrapper
          role="menu"
          onClickOutside={() => setShow(false)}
          className="py-2 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white absolute top-0 right-full mr-1 min-w-32"
        >{children}</ContentWrapper>
      )}
    </div>
  );
}
