import { Icon } from '@iconify-icon/react'

interface AsideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  className?: string;
  isActive?: boolean;
  children?: React.ReactNode
}

export const AsideButton: React.FC<AsideButtonProps> = ({ icon, label, className = '', isActive = false, ...props }) => {
  return (
    <button
      {...props}
      className={`group flex flex-col items-center p-1 gap-1 ${className}`}
    >
      <span
        className={`py-0.5 leading-none rounded-s-full rounded-e-full px-4 transition-colors duration-150 ${
          isActive
            ? 'bg-aso-primary/15 text-neutral-900 font-bold'
            : 'group-hover:bg-neutral-200 text-neutral-600'
        }`}>
        <Icon icon={icon} className='text-2xl font-bold' />
      </span>

      <span className={`text-[11px] whitespace-break-spaces text-neutral-600 leading-none ${isActive && 'font-bold' }`}> { label.trim().split(' ').join("\n") } </span>
    </button>
  )
}
