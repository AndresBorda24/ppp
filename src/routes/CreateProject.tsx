import View from '../components/view'
import { ActionFunctionArgs, Form } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import { AppInput, AppTextarea, AppLabel } from '../components/forms'
import { useState } from 'react'
import { BaseButton } from '../components/button'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log({ data: Object.fromEntries(formData) })
  return null
}

const PRIORITY_LEVELS: { [k: string]: { name: string, icon: React.ReactNode } } = {
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

const CreateProject: React.FC = () => {
  const [priority, setPriority] = useState(Object.keys(PRIORITY_LEVELS)[1])

  return (
    <View title='Crear Un Nuevo Proyecto'>
      <Form method='POST' className='max-w-lg'>
        <AppLabel className='mb-4'>
          Nombre del Proyecto:
          <AppInput
            required
            id='title'
            name='title'
            placeholder='Project Planner'
          />
        </AppLabel>

        <AppLabel className='mb-4'>
          Una breve descripción:
          <AppTextarea
            rows='5'
            required
            id='description'
            name='description'
            placeholder='Un medio en el que se puedan registras otros proyectos...'
          ></AppTextarea>
        </AppLabel>

        <AppLabel>Prioridad</AppLabel>
        <div className='flex flex-wrap gap-2 border bg-neutral-50 rounded p-2 w-full justify-center mb-4'>
          {
            Object.keys(PRIORITY_LEVELS).map(key => (
              <AppLabel
                key={key}
                className={`px-3 py-1.5 transition-colors cursor-pointer rounded !flex flex-col flex-1 items-center ${ (priority === key) && 'bg-white shadow font-bold' }`}
              >
                {PRIORITY_LEVELS[key].name}
                {PRIORITY_LEVELS[key].icon}
                <input
                  type="radio"
                  name="priority"
                  value={key}
                  onChange={(e) => setPriority(e.target.value) }
                  className='absolute inset-0 m-auto invisible'
                />
              </AppLabel>
            ))
          }
        </div>

        <BaseButton color='tertiary' type='submit'>Guardar</BaseButton>
      </Form>
    </View>
  )
}

export default CreateProject
