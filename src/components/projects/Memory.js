import '../../styles/projects/Memory.css';
import {useEffect, useRef, useState} from 'react';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const data = [];

for(let i=0; i<8;i++) {
  data.push({id: i, img: `/images/${i+1}.png`, flip: false, good: false});
  data.push({id: i+8, img: `/images/${i+1}.png`, flip: false, good: false});
}

shuffleArray(data);

const Memory = () => {
  const [state, setState] = useState([...data]);
  const block = useRef(false);
  const moves = useRef(null);
  const interval = useRef(null);
  const time = useRef(null);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if(firstClick)
      interval.current = setInterval(() => {
        time.current.textContent = Number(time.current.textContent)+1
      }, 1000);

    return () => clearInterval(interval.current);
  }, [firstClick])

  useEffect(() => {
    const boxes = state.filter(item => item.flip);
    if(boxes.length === 2) {
      moves.current.textContent = Number(moves.current.textContent)+1;
      if(boxes[0].img === boxes[1].img) {
        setState(prev => {
          const newState = [...prev];
          newState.forEach(item => {
            if(item.img === boxes[0].img) {
              item.good = true;
              item.flip = false;
            }
          })
          return newState;
        })
      } else {
        block.current = true;
        setTimeout(() => {
          setState(prev => {
            const newState = [...prev];
            newState.forEach(item => {
              item.flip = false;
            })
            return newState;
          });
          block.current = false;
        }, 800);
      }
    }
  }, [state]);

  const handleClickBox = (id) => {
    if(!firstClick) setFirstClick(true);
    if(
      state.filter(item => item.flip).length < 2 &&
      !state.find(item => item.id === id).good
    )
    if(block.current === false) {
      setState(prevState => {
        const newState = [...prevState];
        newState?.forEach(x => {
          if(x.id === id) x.flip = true;
        })
        return newState;
      });
    }
  }

  const handleResetGame = () => {
    shuffleArray(data);
    setFirstClick(false);
    moves.current.textContent = 0;
    time.current.textContent = 0;
    setState([...data.map(item => {
      item.good = false;
      return item;
    })]);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      time.current.textContent = Number(time.current.textContent)+1
    }, 1000)
  }

  if(state.filter(item => !item.good).length === 0) {
    clearInterval(interval.current);
  }

  return (
    <div className="Memory">
      <h5>Ruchy: <span ref={moves}>0</span></h5>
      <h5>Czas: <span ref={time}>0</span>s</h5>
      <div className="container">
        {state.map((item, index) => (
          <div key={item.id} className={`box${item.good ? ' good' : ''}`} onClick={() => handleClickBox(item.id)}>
            {(item.flip || item.good) && <img alt={'obraz '+index} src={item.img}/>}
          </div>
        ))}
        {(state.filter(item => !item.good).length === 0) && <div className="endBox">
          <span>Wygrałeś!</span>
        </div>}
      </div>
      <button onClick={handleResetGame}>Reset</button>
    </div>
  )
}

export default Memory;