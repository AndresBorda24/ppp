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
