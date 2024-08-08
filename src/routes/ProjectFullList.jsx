import View from "../components/view";

export function ProjectFullList() {
  return (
    <View title='Todos los proyectos'>
      <div className='full-project-list'>
        {(Array.from({ length: 15 }).fill(null).map((_, index) => (
          <ProjectCard key={index}/>
        )))}
      </div>
    </View>
  )
}


function ProjectCard() {
  return (
    <div className='rounded-lg bg-white border border-dashed border-neutral-200 p-5 hover:bg-neutral-50 transition-colors'>
      <header>
        <h4 className='font-bold text-aso-secondary'>Nombre del proyecto!</h4>
      </header>
      <p className='text-neutral-600 text-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis laboriosam esse inventore labore libero eum, quam asperiores aspernatur...</p>
      <footer className='flex items-center justify-between text-xs text-neutral-500 mt-1'>
        <b>Un usuario de pruebas</b>
        <span className='inline-block p-1 rounded-sm bg-amber-100 text-amber-700'>Pendiente</span>
      </footer>
    </div>
  )
}
