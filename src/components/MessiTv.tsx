import { useState } from "react"

export const MessiTv: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className={`w-[300px] relative ${className}`} >
      <button
        onClick={() => setIsOn(!isOn)}
        className="w-6 h-6 absolute top-[35px] right-[19px] z-20 opacity-0"
      ></button>
      <div
        className='absolute bg-neutral-900 z-0 w-[216px] h-[169px] top-[17px] left-[17px]'
      ></div>
      <img
        src="/messi-chikito.gif"
        alt="Encara Messi"
        className={`absolute z-0 w-[216px] h-[169px] top-[17px] left-[17px] ${!isOn && 'hidden' }`}
        style={{ filter: 'grayscale(0.5)' }}
      />
      <img
        src="/tv.png"
        alt="Television antigua"
        className='object-contain w-full z-10 relative'
      />
    </div>
  )
}
