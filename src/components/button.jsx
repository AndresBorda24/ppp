import { tv } from 'tailwind-variants';
/**
 * @typedef {'primary'|'secondary'|'tertiary'} ButtonColor
 * @typedef {'base'|'big'|'small'} ButtonSize
*/

const ButtonVariants = tv({
  base: 'focus:ring-4 font-medium focus:outline-none focus:ring transition-colors',
  variants: {
    color: {
      primary: 'bg-aso-primary hover:bg-aso-secondary focus:ring-aso-primary/40 text-white',
      secondary: 'bg-aso-secondary hover:bg-aso-tertiary focus:ring-aso-secondary/40 text-white',
      tertiary: 'bg-aso-yellow hover:bg-amber-600 focus:ring-amber-300 text-neutral-900'
    },
    size: {
      base: 'text-sm px-4 py-1.5 rounded-lg',
      big: 'text-lg px-4 py-2.5 rounded-lg',
      small: 'text-xs px-2 py-1 rounded'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'base'
  }
})

/**
 * @param {Object} props
 * @param {ButtonColor} props.color
 * @param {ButtonSize} props.size,
 * @param {Boolean} props.disabled
 * @param {string} props.className
*/
export function BaseButton({ color = 'primary', size = 'base', disabled = false, className, ...rest }) {
  return (
    <button
      {...rest}
      className={`${ButtonVariants({ color, size, disabled })} ${className || ''}`}
    />
  )
}
