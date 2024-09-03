import { useId } from "react";
import { AppInput, AppSelect, AppLabel } from "./forms"
import { BaseButton } from "./button";

/**
 * La idea de este componente es poder determinar una fecha a partir de dias,
 * semanas, mesas o años.
*/
interface Props {
  defaultDate: string|null;
  className?: string;
  setDate: (d: string) => void
}
export const HelperDates: React.FC<Props> =  ({ setDate, defaultDate = null, className = ''}) => {
  const selectId = useId()
  const amountId = useId()

  const handleSubmit = () => {
    const option = (document.getElementById(selectId) as HTMLSelectElement)!.value
    const amountToAdd = parseInt((document.getElementById(amountId) as HTMLInputElement)!.value)

    let now = (defaultDate === null) ? new Date() : new Date(defaultDate)
    if (now.toString() === 'Invalid Date') {
      now = new Date()
    }
    switch (option) {
      case "day":
        now.setDate(now.getDate() + amountToAdd)
        break
      case "week":
        now.setDate(now.getDate() + amountToAdd * 7)
        break
      case "month":
        now.setMonth(now.getMonth() + amountToAdd)
        break
      default:
        now.setFullYear(now.getFullYear() + amountToAdd)
    }

    const date = now.toISOString().substring(0, 10)
    setDate(date)
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2">
        <AppLabel>
          Medida:
          <AppSelect id={selectId} defaultValue="day" className="min-w-24">
            <option value="day">Días</option>
            <option value="week">Semanas</option>
            <option value="month">Meses</option>
            <option value="year">Años</option>
          </AppSelect>
        </AppLabel>

        <AppLabel>
          Cantidad:
          <AppInput type="number" id={amountId} required min={1} className="w-16 !px-1" defaultValue={1} />
        </AppLabel>

        <BaseButton size="small" color="tertiary" onClick={handleSubmit}>✔</BaseButton>
      </div>
    </div>
  )
}
