import { AppLabel } from './forms'
import { Icon } from '@iconify-icon/react'
import { Priority } from '../types'

const PRIORITY_LEVELS = {
  low: {
    name: 'Baja',
    icon: <Icon icon="healthicons:low-level" height={20} />
  },
  normal: {
    name: 'Normal',
    icon: <Icon icon="healthicons:medium-level" height={20} />
  },
  high: {
    name: 'Alta',
    icon: <Icon icon="healthicons:high-level" height={20} />
  }
}

interface Props {
  priority: Priority,
  setPriority: (p: Priority) => void
}

export const SelectPriority: React.FC<Props&{ className?: string }> = ({
  priority,
  setPriority,
  className = ''
}) => {
  function onKeyUp(e: React.KeyboardEvent, p: Priority) {
    const { key } = e;
    if (key === "Enter") {
      setPriority(p);
    } else if (key === "ArrowLeft") {
      // @ts-ignore
      document.activeElement?.previousElementSibling?.focus();
    } else if (key === "ArrowRight") {
      // @ts-ignore
      document.activeElement?.nextElementSibling?.focus()
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 border bg-neutral-50 rounded p-2 w-full justify-center ${className}`}>
      {
        Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
          <AppLabel
            key={key}
            tabIndex={0}
            onKeyUp={(e) => onKeyUp(e, key as Priority)}
            className={`px-3 py-1.5 transition-colors cursor-pointer rounded !flex flex-col flex-1 items-center outline-offset-4 outline-none outline-dashed focus:outline-neutral-200  ${ (priority === key) && 'bg-white shadow font-bold' }`}
          >
            {value.name}
            {value.icon}
            <input
              type="radio"
              name="priority"
              value={key}
              onChange={(e) => setPriority(e.target.value as Priority) }
              className='absolute inset-0 m-auto invisible'
            />
          </AppLabel>
        ))
      }
    </div>
  )
}
