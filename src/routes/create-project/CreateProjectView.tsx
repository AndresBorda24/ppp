import { AppInput, AppLabel, AppTextarea } from '../../components/forms'

import { BaseButton } from '../../components/button'
import { Form } from 'react-router-dom'
import { MessiTv } from '../../components/MessiTv'
import { Priority } from '../../types'
import { SelectPriority } from '../../components/Priority'
import View from '../../components/view'
import { useState } from 'react'

export const CreateProjectView: React.FC = () => {
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
