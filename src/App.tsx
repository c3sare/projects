import Memory from './components/projects/Memory';
import Calculator from './components/projects/Calculator';
import TicTacToe from './components/projects/TicTacToe';
import Notes from './components/projects/Notes';

import ProjectBoardWithButtons from './components/ProjectBoardWithButtons';
import Timer from './components/projects/Timer';
import ColorGenerator from './components/projects/ColorGenerator';

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
    },
    {
      name: "Stoper",
      component: <Timer/>
    },
    {
      name: "Losowy Generator Kolorów",
      component: <ColorGenerator/>
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