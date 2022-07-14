import "../../styles/projects/ColorGenerator.css";
import { useState } from "react";

const ColorGenerator = () => {
    const [color, setColor] = useState<string>('#FFFFFF');
    const [textColor, setTextColor] = useState<string>('#000000');

    const handleGenerateColor = () => {
        const symbols:(string | number)[] = [
            ...[...Array(10)].map((_x, i) => i),
            ...[...Array(6)].map((_x, i) => String.fromCharCode(65+i))
        ];
        const tab = [];
        const tabText = [];
        for(let i=0; i<6;i++) {
            const randomNumber = Math.floor(Math.random()*symbols.length);
            tab.push(symbols[randomNumber]);
            tabText.push(symbols[symbols.length-1-randomNumber]);
        }
        setColor('#' + tab.join(''));
        setTextColor('#'+ tabText.join(''));
    }

    return (
        <div className="colorGenerator" style={{backgroundColor: color}}>
            <h3 style={{color: textColor}}>{color}</h3>
            <button onClick={handleGenerateColor}>Losuj</button>
        </div>
    )
}

export default ColorGenerator;