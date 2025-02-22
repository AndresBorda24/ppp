import React, { useEffect, useRef, useState } from "react";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface withChildren {
  children?: React.ReactNode;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const AppInput: React.FC<InputProps> = ({
  className = "",
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      {...props}
      className={`bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5 ${className}`}
    />
  );
};

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const AppTextarea: React.FC<TextareaProps> = ({
  className = "",
  ...props
}) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textarea.current!.style.height = textarea.current!.scrollHeight + 5 + "px";
  }, []);

  return (
    <textarea
      ref={textarea}
      {...props}
      className={`bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5 ${className}`}
    ></textarea>
  );
};

export const AppLabel: React.FC<
  {
    className?: string;
    children: React.ReactNode;
  } & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ className, ...props }) => {
  return (
    <label
      className={`text-xs block text-neutral-500 ${className}`}
      {...props}
    />
  );
};

export const AppSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement>
> = (props) => {
  return (
    <select
      {...props}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5 ${props.className}`}
    />
  );
};

interface XContainerProps {
  mainChildren: React.ReactNode;
  children: React.ReactNode;
}
export const XContainer: React.FC<XContainerProps> = ({
  mainChildren,
  children,
}) => {
  const [showInput, setShowInput] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showInput &&
        container.current &&
        !container.current.contains(e.target as Node)
      ) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]);

  useEffect(() => {
    if (showInput)
      (
        container.current?.querySelector(
          ".xinput-container :first-child"
        ) as HTMLInputElement
      )?.focus();
  }, [showInput]);

  return (
    <div
      ref={container}
      onClick={() => setShowInput(true)}
      onFocus={() => setShowInput(true)}
      onBlur={() => setShowInput(false)}
      tabIndex={!showInput ? 0 : -1}
      title={!showInput ? "Da click para modificar." : undefined}
      className={`p-1 rounded border border-transparent ${
        showInput ? "" : "hover:border-blue-300"
      }`}
    >
      <div className={"xinput-container " + `${!showInput && "invisible h-0"}`}>
        {mainChildren}
      </div>
      {!showInput && children}
    </div>
  );
};

interface XInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const XInput: React.FC<XInputProps & withChildren> = ({
  children,
  ...props
}) => {
  return (
    <XContainer mainChildren={<AppInput {...props} />} children={children} />
  );
};

interface XTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const XTextarea: React.FC<XTextareaProps & withChildren> = ({
  children,
  ...props
}) => {
  return (
    <XContainer mainChildren={<AppTextarea {...props} />} children={children} />
  );
};

interface BasicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const BasicInput: React.FC<BasicInputProps> = ({
  className = "",
  placeholder = "Escribe aquí.",
  ...props
}) => {
  return (
    <input
      {...props}
      placeholder={placeholder}
      className={`block focus-visible:outline-none ${className}`}
    />
  );
};

interface BasicTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
export const BasicTextarea: React.FC<BasicTextareaProps> = ({
  className = "",
  placeholder = "Puedes escribir aquí",
  ...props
}) => {
  const textarea = useRef<HTMLTextAreaElement>(null);

  function autoResizeHandler() {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  }

  useEffect(() => {
    textarea.current?.addEventListener("input", autoResizeHandler);
    textarea.current?.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );
    return () => {
      textarea.current?.removeEventListener("input", autoResizeHandler);
    };
  }, []);

  return (
    <textarea
      {...props}
      ref={textarea}
      placeholder={placeholder}
      className={`block focus-visible:outline-none ${className}`}
    ></textarea>
  );
};

interface InputWithIconProps extends BasicInputProps {
  icon: string;
  iconClassName?: string;
  onIconClick?: () => void;
}
export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  iconClassName = "",
  onIconClick = () => {},
  ...props
}) => {
  return (
    <div className="relative">
      <Icon
        icon={icon}
        onClick={onIconClick}
        className={`text-neutral-400 block px-1.5 absolute ${iconClassName} top-1/2 transform -translate-y-1/2`}
      />
      <BasicInput
        {...props}
        className="w-full py-1.5 px-2 rounded border pl-8"
      />
    </div>
  );
};
