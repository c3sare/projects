import '../../styles/projects/TicTacToe.css';
import {useState, useEffect, useCallback} from 'react';

const TicTacToe = () => {
    const [fields, setFields] = useState<Array<string>>([...Array(9)].map(_item => ''));
    const [currentPlayer, setCurrentPlayer] = useState<'o' | 'x'>('o');
    const [endGame, setEndGame] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');
    const [winnerPosition, setWinnerPositions] = useState<[number, number, number] | []>([]);

    const toWin = useCallback(():Array<[number, number, number]> => ([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]), [])();

    const computerChoose = (fields:string[] ,symbol:'o' | 'x'):number => {
        let mark = null
        for(let i=0;i<toWin.length;i++) {
            if(
                (fields[toWin[i][0]] === '' ||
                fields[toWin[i][0]] === symbol) &&
                (fields[toWin[i][1]] === '' ||
                fields[toWin[i][1]] === symbol) &&
                (fields[toWin[i][2]] === '' ||
                fields[toWin[i][2]] === symbol)
            ) {
                const fieldsToMark = toWin[i].filter(item => fields[item] !== symbol)
                mark = fieldsToMark[Math.floor((Math.random()*1000))%fieldsToMark.length];
            }
        }
        return mark !== null ? mark : fields.findIndex(item => item === '');
    }

    const checkWin = (fields:string[]) => {
        let win = false;
        for (let i = 0; i < toWin.length; i++) {
            const [a, b, c] = toWin[i];
            if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
              win = true;
            }
        }

        return win;
    }

    useEffect(() => {
        for (let i = 0; i < toWin.length; i++) {
            const [a, b, c] = toWin[i];
            if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
              setEndGame(true);
              setWinner(fields[a]);
              setWinnerPositions([...toWin[i]]);
            }
        }
        if(!fields.filter(item => item !== 'o' && item !== 'x').length) setEndGame(true);
        // eslint-disable-next-line
    }, [fields]);

    const handleResetGame = () => {
        setFields(fields.map(_item => ''));
        setEndGame(false);
        setWinner('');
        setCurrentPlayer('o');
        setWinnerPositions([]);
    }

    const handleClickField = (i:number) => {
        if(fields[i] || endGame) return;

        setFields(prev => {
            const newState = [...prev];
            newState[i] = currentPlayer;
            if(!checkWin(newState)) newState[computerChoose(newState, 'x')] = 'x';
            
            return newState;
        });

        // setCurrentPlayer(prev => 
        //     prev === 'o' ? 'x' : 'o'
        // );
    }

    return (
        <div className="tictactoe">
            <h3 style={{width: '100%', textAlign: 'center'}}>Teraz: {currentPlayer.toUpperCase()}</h3>
            <div className="fields">
                {fields.map((field:string, i) => (
                    <div className="field" key={i} onClick={() => handleClickField(i)} style={winnerPosition.filter(item => item === i).length > 0 ? {backgroundColor: 'rgba(200, 210, 200, 0.5)'} : {}}>
                        {field.toUpperCase()}
                    </div>
                ))}
                {endGame &&
                    <div className="endGame">
                        <button onClick={handleResetGame}>Restart</button>
                        <p>{winner ? `Wygrał '${winner.toUpperCase()}'` : 'Remis'}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default TicTacToe;