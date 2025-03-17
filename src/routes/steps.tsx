import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/steps")({
  component: Steps,
});

function Steps() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepList = [
    { description: "Forms", position: 1 },
    { description: "Agreement", position: 2 },
    { description: "Confirmation", position: 3 },
  ];

  function changeSteps(operation: "previous" | "next") {
    if (operation == "previous") {
      if (currentStep >= 1) setCurrentStep((s) => s - 1);
    }
    if (operation == "next") {
      if (currentStep < 3) setCurrentStep((s) => s + 1);
    }
  }

  return (
    <div>
      Hello {currentStep}
      <ShowSteps currentStep={currentStep} stepList={stepList}></ShowSteps>
      <button className="border-2 p-2" onClick={() => changeSteps("previous")}>
        Previous
      </button>
      <button className="border-2 p-2" onClick={() => changeSteps("next")}>
        Next
      </button>
      <MenuSwitcher currentStep={currentStep} />
    </div>
  );
}

function ShowSteps({
  currentStep,
  stepList,
}: {
  currentStep: number;
  stepList: { description: string; position: number }[];
}) {
  return (
    <div>
      <div>Stages</div>
      <div className="flex flex-row justify-center">
        {stepList.map((e) => {
          return (
            <div className={"mx-2 " + (e.position <= currentStep ? "text-red-800 font-bold" : "")}>
              {e.position.toString()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MenuSwitcher({ currentStep }: { currentStep: Number }) {
  switch (currentStep) {
    case 1:
      return <ShowForms />;
    case 2:
      return <ShowAgreement />;
    case 3:
      return <ShowConfirmation />;
    default:
      return <div>Start Menu</div>;
  }
}

function ShowForms() {
  return <div>Forms</div>;
}

function ShowAgreement() {
  return <div>Agreement</div>;
}

function ShowConfirmation() {
  return <div>Confirmation</div>;
}
