export default function View({title, children}) {
  return (
    <div className='p-6 md:p-8 lg:p-10 overflow-auto flex-1'>
      <h1 className='font-bold text-2xl text-aso-primary mb-6'>{title}</h1>
      <main>
        {children}
      </main>
    </div>
  )
}
