import React, { useCallback, useEffect, useRef } from "react";
import "../../styles/projects/Calculator.css";

const modes = ["+", "-", "*", "/"];

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

const Calculator = () => {
  const score = useRef<null | HTMLParagraphElement>(null);
  const secondScore = useRef<null | HTMLSpanElement>(null);
  const mode = useRef<number>(0);
  const currentMode = useRef<null | HTMLSpanElement>(null);
  const newValue = useRef<boolean>(false);

  const handleChangeMode = useCallback((modo: number) => {
    if (
      secondScore.current!.textContent !== "" &&
      Number(score.current?.textContent) !== 0
    ) {
      returnValue();
      mode.current = modo;
      secondScore.current!.textContent = String(score.current?.textContent);
      score.current!.textContent = "0";
    } else if (Number(score.current!.textContent) !== 0) {
      if (mode.current === 0) {
        secondScore.current!.textContent = String(score.current!.textContent);
        score.current!.textContent = "0";
      }
      mode.current = modo;
    }
    currentMode.current!.textContent =
      mode.current === 0 ? "" : modes[mode.current - 1];
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (let i = 0; i < 10; i++) {
        if (event.key === `${i}`) {
          const e = { target: { textContent: `${i}` } };
          setScore(e);
        }
      }
      if (event.key === ":") {
        handleChangeMode(4);
      }
      for (let i = 0; i < modes.length; i++) {
        if (event.key === modes[i]) {
          handleChangeMode(i + 1);
        }
      }
      if (event.key === "=" || event.key === "Enter") {
        returnValue();
      }
      if (event.key === ".") {
        toFloat();
      }
      if (event.key === "Backspace") {
        handleDelButton();
      }

      document.querySelectorAll("button").forEach((item) => {
        if (
          item.textContent === event.key ||
          (item.textContent === "⇽" && event.key === "Backspace") ||
          (item.textContent === "=" && event.key === "Enter") ||
          (item.textContent === "/" && event.key === ":")
        ) {
          item.classList.add("active");
          setTimeout(() => item.classList.remove("active"), 150);
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [handleChangeMode]);

  const returnValue = () => {
    if (mode.current !== 0) {
      if (
        secondScore.current!.textContent !== "" &&
        Number(score.current!.textContent) === 0
      ) {
        score.current!.textContent = secondScore.current!.textContent;
        secondScore.current!.textContent = "";
        mode.current = 0;
        currentMode.current!.textContent = "";
        return;
      }
      if (mode.current === 1) {
        score.current!.textContent = String(
          Number(secondScore.current!.textContent) +
            Number(score.current!.textContent)
        );
      } else if (mode.current === 2) {
        score.current!.textContent = String(
          Number(secondScore.current!.textContent) -
            Number(score.current!.textContent)
        );
      } else if (mode.current === 3) {
        score.current!.textContent = String(
          Number(secondScore.current!.textContent) *
            Number(score.current!.textContent)
        );
      } else if (mode.current === 4) {
        score.current!.textContent = String(
          Number(secondScore.current!.textContent) /
            Number(score.current!.textContent)
        );
      }
      if ([1, 2, 3, 4].includes(mode.current)) newValue.current = true;
      secondScore.current!.textContent = "";
      mode.current = 0;
      currentMode.current!.textContent = "";
    }
  };

  const setReverse = () => {
    score.current!.textContent = String(-Number(score.current!.textContent));
  };

  const setScore = (e: React.MouseEvent<HTMLButtonElement> | any): void => {
    let summary = score.current!.textContent;
    if (newValue.current) {
      newValue.current = false;
      score.current!.textContent = e.target!.textContent;
    } else if (summary!.length < 16) {
      if (summary!.indexOf(".") > -1) {
        score.current!.textContent = summary + e.target.textContent;
      } else if (Number(summary) === 0) {
        if (Number(e.target.textContent) !== 0)
          score.current!.textContent = e.target.textContent;
      } else {
        score.current!.textContent = summary + e.target.textContent;
      }
    }
  };

  const handleDelButton = () => {
    if (newValue.current) {
      score.current!.textContent = "0";
      newValue.current = false;
      return;
    }
    if (Number(score.current!.textContent) !== 0) {
      if (
        score.current!.textContent!.length === 1 ||
        (score.current!.textContent!.length === 2 &&
          score.current!.textContent!.indexOf("-") > -1)
      ) {
        score.current!.textContent = "0";
      } else
        score.current!.textContent = score.current!.textContent!.slice(
          0,
          score.current!.textContent!.length - 1
        );
    } else if (score.current!.textContent!.indexOf(".") > -1) {
      score.current!.textContent = "0";
    }
  };

  const toFloat = () => {
    if (score.current!.textContent!.indexOf(".") < 1)
      score.current!.textContent = score.current!.textContent + ".";
  };

  return (
    <div className="calculator">
      <div className="secondScore">
        <span ref={secondScore}></span>
        <span>&nbsp;</span>
        <span ref={currentMode}></span>
      </div>
      <div className="scoreBox">
        <p ref={score}>0</p>
        <button onClick={handleDelButton}>{"⇽"}</button>
      </div>
      <div>
        {modes.map((modo, index) => (
          <button key={index} onClick={() => handleChangeMode(index + 1)}>
            {modo}
          </button>
        ))}
      </div>
      <div className="boxNumsReturn">
        <div className="nums">
          {nums.map((num, i) => (
            <button key={i} onClick={(e) => setScore(e)}>
              {num}
            </button>
          ))}
          <button onClick={setReverse}>+/-</button>
          <button onClick={toFloat}>.</button>
        </div>
        <div className="end">
          <button onClick={returnValue}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
