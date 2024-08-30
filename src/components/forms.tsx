import React, { useEffect, useRef, useState } from "react"

interface withChildren { children?: React.ReactNode }
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
export const AppInput: React.FC<InputProps> = ({ type = 'text', ...props }) => {
  return (
    <input
      type={type}
      {...props}
      className="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5"
    />
  )
}

export const AppTextarea = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5"
    ></textarea>
  )
}

export const AppLabel: React.FC<{
  className?: string;
  children: React.ReactNode
}> = ({ className, ...props }) => {
  return (
    <label className={`text-xs block text-neutral-500 ${className}`} {...props} />
  )
}


export const AppSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
  return (
    <select
      {...props}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5"
    />
  )
}


interface XContainerProps {
  mainChildren: React.ReactNode,
  children: React.ReactNode
}
export const XContainer: React.FC<XContainerProps> = ({
  mainChildren,
  children
}) => {
  const [showInput, setShowInput] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showInput && container.current && !(container.current).contains(e.target as Node)) {
        setShowInput(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showInput])

  useEffect(() => {
    if (showInput)
      (container.current?.querySelector(':first-child') as HTMLInputElement)?.focus()
  }, [showInput])

  return (
    <div
      ref={container}
      onClick={() => setShowInput(true)}
      title={!showInput ? "Da click para modificar." : undefined}
      className={`p-1 rounded border border-transparent ${showInput ? '' : 'hover:border-blue-300'}`}
    > { showInput ? mainChildren : children } </div>
  )
}

interface XInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const XInput: React.FC<XInputProps&withChildren> = ({children,...props}) => {
  return (
    <XContainer
      mainChildren={<AppInput {...props} />}
      children={children}
    />
  )
}

interface XTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const XTextarea: React.FC<XTextareaProps&withChildren> = ({children, ...props}) => {
  return (
    <XContainer
      mainChildren={<AppTextarea {...props} />}
      children={children}
    />
  )
}
