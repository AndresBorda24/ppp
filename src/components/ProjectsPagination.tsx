import { useState } from "react"
import { type Pagination } from "../types"

interface Props {
  pagination: Pagination,
  onPageChange: (page: number) => void
}

export const ProjectPagintaion: React.FC<Props> = ({ pagination, onPageChange }) => {
  const { last_page, current_page } = pagination
  const [currentPage, setCurrentPage] = useState(current_page)

  function handleOnClick(page: number) {
    setCurrentPage(page)
    onPageChange(page)
  }

  return (
    <>
      <span className='hidden text-center text-neutral-600 text-xs mb-1 xl:block'>Páginas:</span>
      <div className='flex flex-col gap-1 flex-wrap xl:flex-row xl:justify-center'>
        {
          Array(last_page).fill(null).map((_, i) => {
            const page = i + 1
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleOnClick(page)}
                className={`leading-none p-1 h-6 w-auto rounded-sm aspect-square block ${
                  (page === currentPage)
                    ? 'bg-aso-primary text-white'
                    : 'bg-white text-neutral-500 border hover:bg-neutral-50'
                }`}
              >{page}</button>
            )
          })
        }
      </div>
    </>
  )
}
