import { Icon } from "@iconify-icon/react"
import { useState } from "react";

interface Props {
  title: string,
  children: React.ReactNode,
  topChildren?: React.ReactNode
}

export const TaskModalSection: React.FC<Props> = ({ title, children, topChildren = null }) => {
  const [show, setShow] = useState(true);

  return (
    <section className="relative">
      <Icon
        icon="uil:angle-right"
        className={`absolute right-full top-2 text-xl text-neutral-600 transition-transform duration-100 ${show ? 'rotate-90' : ''}`}
      />
      <div className="flex border-b border-neutral-100 mb-1 pb-1 pt-2 items-center">
        <span
          onClick={() => setShow(!show)}
          className="select-none text-sm font-semibold text-neutral-600 cursor-pointer"
        >{title}</span>
        {topChildren}
      </div>
      {
        show ? (
          <div className="py-2">
            {children}
          </div>
        ) : null
      }
    </section>
  );
}
