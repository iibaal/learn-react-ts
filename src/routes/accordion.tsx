import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/accordion")({
  component: Accordion,
});

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function Accordion() {
  return (
    <div className="accordion">
      {faqs.map((e, i) => {
        return <AccordionItem num={i} title={e.title} text={e.text} />;
      })}
    </div>
  );
}

function AccordionItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={"item " + (isOpen ? "open" : "")}
      onClick={() => setIsOpen((e) => !e)}
    >
      <p className="number">{num}</p>
      <p className="title">{title}</p>
      <p className="icon">-</p>
      {isOpen ? <div className="content-box">{text}</div> : ""}
    </div>
  );
}
