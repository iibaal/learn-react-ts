import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/flashCard")({
  component: FlashCards,
});

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question: "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [activeCard, setActiveCard] = useState<number>(2002);

  function toggleCard(id: number) {
    setActiveCard(id);
  }

  return (
    <div className="flashcards mt-4">
      {questions.map((e) => {
        return (
          <div
            onClick={() => toggleCard(e.id)}
            className={"flashcards " + (e.id == activeCard && "selected")}>
            {e.id == activeCard ? e.answer : e.question}
          </div>
        );
      })}
    </div>
  );
}
