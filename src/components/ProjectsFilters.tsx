import { Form, useSubmit } from "react-router-dom";
import { Icon } from '@iconify-icon/react';
import { AppInput, AppLabel, AppSelect } from "../components/forms.tsx";
import { useEffect, useRef, useState } from "react";
import { ProjectPagintaion } from "./ProjectsPagination.tsx";
import { Pagination } from "../types";

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
  pagination: Pagination
}
export const ProjectFilters: React.FC<Props> = ({
  title,
  pagination,
  amount: defaultAmount,
  order: defaultOrder,
  status: defaultStatus
}) => {
  const [status, setStatus] = useState(defaultStatus)
  const [amount, setAmount] = useState(defaultAmount)
  const [order, setOrder] = useState(defaultOrder)
  const [page, setPage] = useState(pagination.current_page)
  const formularioRef = useRef<HTMLFormElement>(null)
  const btnToggleRef = useRef<HTMLButtonElement>(null)
  const submit = useSubmit()

  function clearStatus() {
    const checkedStatus = document.querySelector('input[name="status"]:checked');
    if (checkedStatus) (checkedStatus as HTMLInputElement).checked = false;
    setStatus('')
  }
  const clearTitle = () => {
    const searchInput = formularioRef.current?.querySelector('[name="title"]') as HTMLInputElement
    if (! searchInput) return
    if (searchInput.value === '') return

    searchInput.value = ''
    submit(formularioRef.current, { replace: true })
  }

  const toggleForm = () => formularioRef.current?.classList.toggle('hidden')
  const handleChangePage = (page: number) => setPage(page)

  useEffect(() => submit(formularioRef.current, {
    replace: true
  }), [status, order, amount, page])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formularioRef.current?.classList.contains('hidden')) return
      if (formularioRef.current && !formularioRef.current.contains(e.target as Node)) {
        const filtersButton = (e.target as HTMLElement).closest('button')
        // Si da click en el boton de Filtros dejamos que este se encargue.
        if (btnToggleRef.current == filtersButton) return
        formularioRef.current.classList.add('hidden')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const searchInput = formularioRef.current?.querySelector('[name="title"]') as HTMLInputElement

    const handleEscDown = (e: KeyboardEvent) => {
      const key = e.key
      if (key === 'Escape') {
        e.preventDefault()
      }
    }

    const handleShortCut = (e: KeyboardEvent) => {
      const key = e.key
      switch (key) {
        case '/':
          if (key !== '/' || searchInput === document.activeElement) return
          formularioRef.current?.classList.remove('hidden')
          searchInput?.focus()
          break

        case 'Escape':
          formularioRef.current?.classList.add('hidden')
          break
      }
    }

    document.addEventListener('keyup', handleShortCut)
    searchInput.addEventListener('keydown', handleEscDown)
    return () => {
      document.removeEventListener('keyup', handleShortCut)
      searchInput.removeEventListener('keydown', handleEscDown)
    }
  }, [])

  return (
    <section>
      <button
        ref={btnToggleRef}
        onClick={toggleForm}
        className='leading-none p-1 rounded border bg-white mb-2 xl:hidden hover:bg-neutral-50 hover:shadow'
      ><Icon icon="mdi:filter" /></button>
      <Form
        ref={formularioRef}
        className='bg-white hidden shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] rounded border p-3 absolute right-0 z-50 xl:shadow-none xl:relative xl:!block'
      >
        <input type="hidden" defaultValue={page} name="page" />
        <h5 className='font-bold text-aso-primary text-lg'>Filtros</h5>
        <div className="flex items-center gap-1">
          <AppLabel className='mb-3 flex-1'>
            Título:
            <AppInput type="search" name='title' placeholder='Proyecto Don quijote' defaultValue={title} />
          </AppLabel>
          <button
            type="button"
            onClick={clearTitle}
            className='leading-none'
            title="Limpiar Filtro de Título"
          > <Icon icon="tdesign:close" /> </button>
        </div>

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
          <AppSelect name="amount" defaultValue={amount} onChange={(e) => setAmount(e.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </AppSelect>
        </AppLabel>
      </Form>
      <hr className='mb-4 mt-2' />
      <ProjectPagintaion
        pagination={pagination}
        onPageChange={handleChangePage}
      />
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
