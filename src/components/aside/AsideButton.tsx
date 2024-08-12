import { Icon } from '@iconify-icon/react'

interface AsideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean,
  children?: React.ReactNode
}

export const AsideButton: React.FC<AsideButtonProps> = ({ isActive = false, ...props }) => {
  return (
    <div className='flex items-center w-full text-aso-secondary'>
      {isActive && <Icon icon="mdi:menu-right" width={20} height={20} className='text-aso-secondary'/>}
      <button
        {...props}
        className={`flex flex-1 items-center gap-3 px-1 py-1.5 rounded ${isActive ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
      ></button>
    </div>
  )
}
