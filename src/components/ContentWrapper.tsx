import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClickOutside?: () => void | undefined;
}
export const ContentWrapper: React.FC<Props> = ({
  onClickOutside,
  className = "",
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleOnClickOutside = () => {
    if (onClickOutside) onClickOutside();
  };

  useOnClickOutside(wrapperRef, handleOnClickOutside);
  return <div ref={wrapperRef} className={className} {...props}></div>;
};
