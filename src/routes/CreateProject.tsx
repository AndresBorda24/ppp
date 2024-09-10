import View from '../components/view'
import { ActionFunctionArgs, Form } from 'react-router-dom'
import { AppInput, AppTextarea, AppLabel } from '../components/forms'
import { useState } from 'react'
import { BaseButton } from '../components/button'
import { SelectPriority } from '../components/Priority'
import { Priority } from '../types'
import { MessiTv } from '../components/MessiTv'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log({ data: Object.fromEntries(formData) })
  return null
}

const CreateProject: React.FC = () => {
  const [priority, setPriority] = useState<Priority>('normal')

  return (
    <View title='Crear Un Nuevo Proyecto'>
      <div className='lg:grid grid-cols-2 max-w-4xl'>
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
              rows={5}
              required
              id='description'
              name='description'
              placeholder='Un medio en el que se puedan registras otros proyectos...'
            ></AppTextarea>
          </AppLabel>

          <AppLabel>Prioridad</AppLabel>
          <SelectPriority priority={priority} setPriority={setPriority} className='mb-4' />

          <BaseButton color='tertiary' type='submit'>Guardar</BaseButton>
        </Form>
        <div className='hidden lg:flex'>
          <MessiTv className='m-auto' />
        </div>
      </div>
    </View>
  )
}

export default CreateProject
