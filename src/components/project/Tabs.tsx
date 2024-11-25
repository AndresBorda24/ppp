import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react';
import { TaskList } from './Tasks';
import { useBreakpoint } from '../../hooks/breakpoints';

export const Tabs: React.FC = () => {
  const [tab, setTab] = useState(1);
  const isMd = useBreakpoint('lg'); // A partir de md es true

  useEffect(function() {
    if (!isMd && tab !== 1) {
      setTab(1)
    } else if (isMd) {
      setTab(2)
    }
  }, [isMd]);

  return (
    <div className={`fixed md:w-[calc(100%-72px)] lg:w-full lg:static top-0 right-0 w-full z-10 ${tab > 1 ? 'bg-white h-[calc(100%-63px)] md:h-full lg:h-auto overflow-auto': 'bg-transparent'}`}>
      <div className="mx-4 my-2 rounded-full px-8 flex justify-center items-center bg-neutral-100 gap-4 shadow sticky top-2 z-10">
        {!isMd && <TabButton active={tab === 1} onClick={() => setTab(1)} label='Info' icon='ph:books-fill' />}
        <TabButton active={tab === 2} onClick={() => setTab(2)} label='Tareas' icon='mingcute:task-2-fill' />
        <TabButton active={tab === 3} onClick={() => setTab(3)} label='Obs' icon='mdi:comment-multiple' />
      </div>

      <div className={`${tab > 1 ? 'py-4 px-6 sm:px-0 max-w-lg m-auto' : '' }`}>
        {(tab === 2) && <TaskList /> }
      </div>
    </div>
  );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: string;
  className?: string;
  active?: boolean
}
const TabButton: React.FC<TabButtonProps> = ({ label, icon, active = false, className = '', ...props}) => {
  return (
    <button
      {...props}
      type="button"
      className={`${className} p-1 flex flex-col items-center hover:text-neutral-600 ${active ? 'text-neutral-800' : 'text-neutral-400'}`}
    >
      <span className="py-0.5 w-full leading-none">
        <Icon icon={icon} className="text-lg" />
      </span>
      <span className="text-xs">{label}</span>
    </button>
  );
}
