import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dateCounter")({
  component: DateCounter,
});

function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date(); //use plain variable not state, because its better that the one triggering the rerender is the button
  date.setDate(date.getDate() + count);

  function handleStepButton(operation: "substract" | "add") {
    if (operation == "substract") {
      if (step > 1) setStep((s) => s - 1);
    } else setStep((s) => s + 1);
  }

  function handleCountButton(operation: "substract" | "add") {
    if (operation == "substract") {
      setCount((s) => s + step * -1);
    } else {
      setCount((s) => s + step);
    }
  }

  return (
    <div>
      <div>
        <span>
          <button
            className="border-1 border-gray-500 p-2 mx-2"
            onClick={() => handleStepButton("substract")}
          >
            -
          </button>
        </span>
        <span>Step: {step}</span>
        <button
          className="border-1 border-gray-500 p-2 mx-2"
          onClick={() => handleStepButton("add")}
        >
          +
        </button>
      </div>
      <div>
        <span>
          <button
            className="border-1 border-gray-500 p-2 mx-2"
            onClick={() => handleCountButton("substract")}
          >
            -
          </button>
        </span>
        <span>Count: {count}</span>
        <button
          className="border-1 border-gray-500 p-2 mx-2"
          onClick={() => handleCountButton("add")}
        >
          +
        </button>
      </div>
      <div>
        {count == 0
          ? "Today is " + date.toString()
          : count + " days from now is " + date.toString()}
      </div>
    </div>
  );
}
