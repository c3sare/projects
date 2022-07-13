import '../styles/ProjectBoardWithButtons.css';
import { useState } from "react";
import { Project } from "../App";


const ProjectBoardWithButtons = (props:{projects:Project[]}) => {
    const {projects} = props;
    const [currentAppIndex, setCurrentAppIndex] = useState<number>(
        projects[Number(localStorage.getItem('lastApp'))] ? Number(localStorage.getItem('lastApp')) : 0
    )
    const [currentProject, setCurrentProject] = useState<JSX.Element>(
        projects[Number(localStorage.getItem('lastApp'))]?.component ||
        projects[0]?.component ||
        null
    );
    const [showMenu, setShowMenu] = useState<1 | 0 | true | false>(localStorage.getItem("showMenu") ? Boolean(Number(localStorage.getItem("showMenu"))) : false);

    const handleToggleMenu = () => {
        const switchMenu = !showMenu;
        setShowMenu(switchMenu);
        localStorage.setItem("showMenu", String(switchMenu ? 1 : 0));
    }

    const handleSetProject = (index:number, component:JSX.Element) => {
        setCurrentProject(component);
        setCurrentAppIndex(index);
        localStorage.setItem('lastApp', String(index));
    }

    return (
        <>  
            <div className={"projectSelectMenu"+(showMenu ? " show" : "")}>
                <h2>Lista Projektów</h2>
                {projects.map((project, i) => (
                    <button
                        className={currentAppIndex === i ? "active" : ""}
                        key={i}
                        onClick={() => handleSetProject(i, project.component)}
                    >
                        {project.name}
                    </button>
                ))}
                <div onClick={handleToggleMenu} className="menuButton">{showMenu ? "Ukryj" : "Pokaż"}</div>
            </div>
            {currentProject}
        </>
    )
}

export default ProjectBoardWithButtons;