import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [calc, setCalc] = useState("");

  const operators = ["+", "-", "/", "*"];

  const updateNumber = (num) => {
    // Make a new calculation, delete the previous one, and set the number with the new number entered
    if (calc.slice(-1) === "=") {
      setNumber(num);
      setCalc("");
      return;
    }
    // when calculation is empty and number is 0 
    if (number.slice(0) === "0") {
      setNumber(num);
      return;
    }
    // when number has value, concatenate the two numberes together
    setNumber(number + num);
  };

  const updateCalculation = (operator) => {
    if (calc === "" && operator.includes(number.slice(-1))) {
      return;
    }
    // If the operator is changed after clicking the operator
    if (calc !== "" && number === "" && operators.includes(calc.slice(-1))) {
      if (operators.includes(calc.slice(-1)) && calc.slice(-1)!==operator) {
        const replaced = calc.replace(/.$/, operator);
        console.log("replaced "+replaced);
        setCalc(replaced);
      }
      return;
    }
    // Do calculations on the result
    if (calc.includes("=")) {
      setCalc(number + operator);
      setNumber("");

      return;
    }
    // The everything went okay
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
          <div className="operator" onClick={() => updateCalculation("+")}>
            +
          </div>
          <div className="operator" onClick={() => updateCalculation("-")}>
            -
          </div>
          <div className="operator" onClick={() => updateCalculation("*")}>
            *
          </div>

          <div className="operator" onClick={() => updateCalculation("/")}>
            /
          </div>
          <div className="number" onClick={() => updateNumber("7")}>
            7
          </div>
          <div className="number" onClick={() => updateNumber("8")}>
            8
          </div>
          <div className="number" onClick={() => updateNumber("9")}>
            9
          </div>

          <div className="number" onClick={() => updateNumber("4")}>
            4
          </div>
          <div className="number" onClick={() => updateNumber("5")}>
            5
          </div>
          <div className="number" onClick={() => updateNumber("6")}>
            6
          </div>

          <div className="number" onClick={() => updateNumber("1")}>
            1
          </div>
          <div className="number" onClick={() => updateNumber("2")}>
            2
          </div>
          <div className="number" onClick={() => updateNumber("3")}>
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
            onClick={() => updateNumber("0")}
          >
            0
          </div>
          <div
            className="dot"
            onClick={() => {
              if (!number) {
                updateNumber("0.");
              } else {
                updateNumber(".");
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
