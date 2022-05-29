import '../../styles/projects/TicTacToe.css';
import {useState, useEffect} from 'react';

const toWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const TicTacToe = () => {
    const [fields, setFields] = useState([...Array(9)].map(_item => ''));
    const [currentPlayer, setCurrentPlayer] = useState('o');
    const [endGame, setEndGame] = useState(false);
    const [winner, setWinner] = useState('');
    const [winnerPosition, setWinnerPositions] = useState([]);

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
    }, [fields]);

    const handleResetGame = () => {
        setFields(fields.map(_item => ''));
        setEndGame(false);
        setWinner('');
        setCurrentPlayer('o');
        setWinnerPositions([]);
    }

    const handleClickField = (i) => {
        if(fields[i] || endGame) return;

        setFields(prev => {
            const newState = [...prev];
            newState[i] = currentPlayer;
            
            return newState;
        });
        setCurrentPlayer(prev => prev === 'o' ? 'x' : 'o');
    }

    return (
        <div className="tictactoe">
            <h3 style={{width: '100%', textAlign: 'center'}}>Teraz: {currentPlayer.toUpperCase()}</h3>
            <div className="fields">
                {fields.map((field, i) => (
                    <div className="field" key={i} onClick={() => handleClickField(i)} style={winnerPosition.includes(i) ? {backgroundColor: 'rgba(200, 210, 200, 0.5)'} : {}}>
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