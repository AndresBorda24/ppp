import { Form } from "react-router-dom";
import { Icon } from '@iconify-icon/react';
import { AppInput, AppLabel, AppSelect } from "../components/forms.tsx";
import { useState } from "react";

const ORDERS: { [k: string]: { icon: React.ReactNode } } = {
  asc: { icon: <Icon icon="tabler:sort-ascending-2-filled" /> },
  desc: { icon: <Icon icon="tabler:sort-descending-2-filled" /> }
}
const STATUSES: { [k: string]: { name: string } } = {
  new: { name: 'Nuevo' },
  pending: { name: 'Pendiente' },
  finish: { name: 'Finalizado' }
}

interface Props {
  title: string;
  status: string;
  order: string;
  amount: string;
}
export const ProjectFilters: React.FC<Props> = ({ title, amount, order: defaultOrder, status: defaultStatus }) => {
  const [status, setStatus] = useState(defaultStatus);
  const [order, setOrder] = useState(defaultOrder);

  function clearStatus() {
    const checkedStatus = document.querySelector('input[name="status"]:checked');
    if (checkedStatus) (checkedStatus as HTMLInputElement).checked = false;
    setStatus('')
  }

  return (
    <section className='rounded border p-3'>
      <h5 className='font-bold text-aso-primary text-lg'>Filtros</h5>
      <Form>
        <AppLabel className='mb-3'>
          Título:
          <AppInput type="search" name='title' placeholder='Proyecto Don quijote' defaultValue={title} />
        </AppLabel>

        <AppLabel>Estado:</AppLabel>
        <div className='bg-neutral-50 flex gap-2 p-2 items-center mb-3'>
          {
            Object.keys(STATUSES).map((_) => (
              <CheckableLabel isChecked={(status === _)} key={_} className="flex-1">
                {STATUSES[_].name}
                <input
                  type="radio"
                  name="status"
                  value={_}
                  onChange={(e) => setStatus(e.target.value)}
                  className='absolute invisible'
                />
              </CheckableLabel>
            ))
          }
          <button
            type="button"
            onClick={clearStatus}
            className='leading-none'
            title="Limpiar Filtro de Estado"
          > <Icon icon="tdesign:close" /> </button>
        </div>

        <AppLabel>Orden</AppLabel>
        <div className='bg-neutral-50 flex gap-2 p-2 mb-3'>
          {
            Object.keys(ORDERS).map((key) => (
              <CheckableLabel key={key} isChecked={(order === key)} className="flex-1" >
                {ORDERS[key].icon}
                <input
                  type="radio"
                  name="order"
                  value={key}
                  onClick={e => setOrder((e.target as HTMLInputElement).value)}
                  className='absolute invisible'
                />
              </CheckableLabel>
            ))
          }
        </div>

        <AppLabel>
          Items Por Página
          <AppSelect name="amount" defaultValue={amount}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </AppSelect>
        </AppLabel>
      </Form>
    </section>
  )
}

interface CheckableLabelProps {
  isChecked: boolean;
  children: React.ReactNode;
  className?: string
}
const CheckableLabel: React.FC<CheckableLabelProps> = ({ isChecked, children, className = '' }) => {
  return (
    <label
      className={`block p-2 text-xs text-center text-neutral-600 transition-colors cursor-pointer relative rounded ${className} ${isChecked && 'bg-white shadow'}`}
    > {children} </label>
  );
}
