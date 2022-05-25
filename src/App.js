import Memory from './components/projects/Memory';
import Calculator from './components/projects/Calculator';
import TicTacToe from './components/projects/TicTacToe';
import ProjectBoardWithButtons from './components/ProjectBoardWithButtons';

const App = () => {

  const projects = [
    {
      name: 'Gra w pamięć',
      component: <Memory/>
    },
    {
      name: 'Kalkulator',
      component: <Calculator/>
    },
    {
      name: 'Gra w kółko i krzyżyk',
      component: <TicTacToe/>
    }
  ];


  return (
    <div className="App">
      <ProjectBoardWithButtons
        projects={projects}
      />
    </div>
  )
}

export default App;