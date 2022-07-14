import "../../styles/projects/Timer.css";
import { useRef, useState } from "react";

const Timer = () => {
    const interval:{current: NodeJS.Timeout | null} = useRef(null);
    const timeInMs = useRef<number>(0);
    const [start, setStart] = useState<boolean>(false);
    const header = useRef<null | HTMLHeadingElement>(null);
    const [scores, setScores] = useState<Array<string | null>>([])


    const handleStartTimer = () => {
        if(!start) {
            setStart(true);
            interval.current = setInterval(() => {
                timeInMs.current += 10;
                const minutes = (timeInMs.current - timeInMs.current%(1000*60)) / (1000*60)
                const seconds = (timeInMs.current - (timeInMs.current%1000)) / 1000 % 60;
                const miliseconds = timeInMs.current%1000/10;
                header.current!.textContent = String(
                    `${
                        minutes < 10 ?
                            '0'+minutes 
                            :
                            minutes
                    }:${
                        seconds < 10 ?
                        '0'+seconds
                        :
                        seconds
                    }:${
                        miliseconds < 10 ?
                        '0'+miliseconds
                        :
                        miliseconds
                    }`
                );
            }, 10);
         } else {
            setStart(false);
            clearInterval(interval.current!);
         }
    }

    const handleResetTimer = () => {
        if(start) {
            setStart(false);
            clearInterval(interval.current!);
        }
        timeInMs.current = 0;
        header.current!.textContent = '00:00:00';
        setScores([]);
    }

    const handleAddScore = () => {
        start && setScores((prev) => {
            const newState = [...prev];
            newState.push(header.current!.textContent);
            return newState;
        })
    }

    return (
        <div className="Timer">
            <h2 ref={header}>
                00:00:00
            </h2>
            <button onClick={handleStartTimer}>{start ? 'Stop' : 'Start'}</button>
            <button onClick={handleResetTimer}>Reset</button>
            <button onClick={handleAddScore}>Zapisz wynik</button>
            <ul>
                {scores.map((score, i) => (
                    <li key={i}>
                        {i+1}. {score}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Timer;