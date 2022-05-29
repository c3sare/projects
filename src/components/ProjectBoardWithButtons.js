import '../styles/ProjectBoardWithButtons.css';
import { useState } from "react";


const ProjectBoardWithButtons = ({projects}) => {
    const [currentAppIndex, setCurrentAppIndex] = useState(
        projects[Number(localStorage.getItem('lastApp'))] ? Number(localStorage.getItem('lastApp')) : 0
    )
    const [currentProject, setCurrentProject] = useState(
        projects[Number(localStorage.getItem('lastApp'))]?.component ||
        projects[0]?.component ||
        null
    );
    const [showMenu, setShowMenu] = useState(localStorage.getItem("showMenu") ? Boolean(Number(localStorage.getItem("showMenu"))) : false);

    const handleToggleMenu = () => {
        const switchMenu = !showMenu;
        setShowMenu(switchMenu);
        localStorage.setItem("showMenu", switchMenu ? 1 : 0);
    }

    const handleSetProject = (index, component) => {
        setCurrentProject(component);
        setCurrentAppIndex(index);
        localStorage.setItem('lastApp', index);
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