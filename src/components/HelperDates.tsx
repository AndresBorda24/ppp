import { AppInput, AppSelect, AppLabel } from "./forms"
import { BaseButton } from "./button"

// type hdType = 'day'|'week'|'month'|'year'

/**
 * La idea de este componente es poder determinar una fecha a partir de dias,
 * semanas, mesas o años.
*/
interface Props {
  className?: string;
  setDate: (d: string) => void
}
export const HelperDates: React.FC<Props> =  ({ setDate, className = ''}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const amountToAdd = parseInt(data.get('hdNumber') as string)

    let now = new Date()
    switch (data.get('hdTypeSelect')) {
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
        break
    }

    const date = now.toISOString().substring(0, 10)
    setDate(date)
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-2">
          <AppLabel>
            Medida:
            <AppSelect name="hdTypeSelect" defaultValue="day" className="min-w-24">
              <option value="day">Días</option>
              <option value="week">Semanas</option>
              <option value="month">Meses</option>
              <option value="year">Años</option>
            </AppSelect>
          </AppLabel>

          <AppLabel>
            Cantidad:
            <AppInput type="number" name="hdNumber" required min={1} className="w-16" defaultValue={1}/>
          </AppLabel>
        </div>

        <BaseButton size="small" color="tertiary" type="submit" className="ml-auto block">Establecer</BaseButton>
      </form>
    </div>
  )
}
