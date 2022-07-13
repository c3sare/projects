import Memory from './components/projects/Memory';
import Calculator from './components/projects/Calculator';
import TicTacToe from './components/projects/TicTacToe';
import Notes from './components/projects/Notes';

import ProjectBoardWithButtons from './components/ProjectBoardWithButtons';

export interface Project {
  name: string;
  component: JSX.Element;
}

const App = () => {

  const projects:Project[] = [
    {
      name: "Gra w pamięć",
      component: <Memory/>
    },
    {
      name: "Kalkulator",
      component: <Calculator/>
    },
    {
      name: "Gra w kółko i krzyżyk",
      component: <TicTacToe/>
    },
    {
      name: "Notatki",
      component: <Notes/>
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