export function AppInput({type = 'text', ...props}) {
  return (
    <input
      type={type}
      {...props}
      className="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5"
    />
  )
}

export function AppTextarea({...props}) {
  return (
    <textarea
      {...props}
      className="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded focus:outline-none focus:ring focus:ring-aso-primary/20 focus:border-aso-primary block w-full px-2.5 py-1.5"
    ></textarea>
  )
}

export function AppLabel({ className, ...props}) {
  return (
    <label className={`text-xs block text-neutral-500 ${className}`} {...props} ></label>
  )
}
