import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [calc, setCalc] = useState("");

  const operators = ["+", "-", "/", "*"];

  const updateCalc = (num) => {
    if (calc.slice(-1) === "=") {
      setNumber(num);
      setCalc("");
      return;
    }
    if (number.slice(0) === "0") {
      setNumber(num);
      return;
    }
    setNumber(number + num);
  };

  const calculation = (operator) => {
    if (calc === "" && operator.includes(number.slice(-1))) {
      return;
    }

    if (calc !== "" && number === "" && operators.includes(calc.slice(-1))) {
      if (operators.includes(calc.slice(-1)) !== operator) {
        const replaced = calc.replace(/.$/, operator);
        console.log(replaced);
        setCalc(replaced);
      }
      return;
    }
    if (calc.includes("=")) {
      setCalc(number + operator);
      setNumber("");

      return;
    }
    setCalc(calc + number + operator);
    setNumber("");
  };
  function calculateResult() {
    if (number === "") return;
    if (calc.slice(-1) === "=") return;
    let formula = calc + number;
    console.log(formula);

    setCalc(formula + "=");
    // setNumber(global.eval(formula).toString());

    function evil(fn) {
      // eslint-disable-next-line no-new-func
      return new Function("return " + fn)();
    }

    setNumber(evil(formula));
  }

  return (
    <div className="App">
      <section>
        <div className="container">
          <div className="display">{calc}</div>
          <div className="result">{number || "0"}</div>
          <div className="operator" onClick={() => calculation("+")}>
            +
          </div>
          <div className="operator" onClick={() => calculation("-")}>
            -
          </div>
          <div className="operator" onClick={() => calculation("*")}>
            *
          </div>

          <div className="operator" onClick={() => calculation("/")}>
            /
          </div>
          <div className="number" onClick={() => updateCalc("7")}>
            7
          </div>
          <div className="number" onClick={() => updateCalc("8")}>
            8
          </div>
          <div className="number" onClick={() => updateCalc("9")}>
            9
          </div>

          <div className="number" onClick={() => updateCalc("4")}>
            4
          </div>
          <div className="number" onClick={() => updateCalc("5")}>
            5
          </div>
          <div className="number" onClick={() => updateCalc("6")}>
            6
          </div>

          <div className="number" onClick={() => updateCalc("1")}>
            1
          </div>
          <div className="number" onClick={() => updateCalc("2")}>
            2
          </div>
          <div className="number" onClick={() => updateCalc("3")}>
            3
          </div>
          <div
            className="equal"
            style={{ borderRadius: "0 0 15px 0 " }}
            onClick={() => calculateResult()}
          >
            =
          </div>
          <div
            className="number"
            style={{ borderRadius: "0 0 0 15px " }}
            onClick={() => updateCalc("0")}
          >
            0
          </div>
          <div
            className="dot"
            onClick={() => {
              if (!number) {
                updateCalc("0.");
              } else {
                updateCalc(".");
              }
            }}
          >
            .
          </div>
          <div
            className="clear"
            onClick={() => {
              setCalc("");
              setNumber("");
            }}
          >
            Clear
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
