/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import { StepperFlow } from "./StepperFlow";
import { StepperState } from "../../types";

describe("StepperFlow with navbar and children steps", () => {
  const initialSteps = [
    { type: "Step 1", state: StepperState.Completed },
    { type: "Step 2", state: StepperState.Ready },
    { type: "Step 3", state: StepperState.Ready },
  ];

  const stepperElement = (
    <StepperFlow initialSteps={initialSteps}>
      <div>Step 1 content</div>
      <div>Step 2 content</div>
      <div>Step 3 content</div>
    </StepperFlow>
  );

  it("should marks the current step as completed, moves to the next step and complete flow", () => {
    const { getByLabelText, getByText, queryByAltText } = render(stepperElement);
    expect(queryByAltText("Content Step 1")).toEqual(null);
    expect(getByLabelText("Content Step 2")).toBeDefined();
    expect(queryByAltText("Content Step 3")).toEqual(null);

    const continueButtom = getByLabelText("Continue");
    expect(continueButtom).toBeDefined();
    fireEvent.click(continueButtom);

    expect(queryByAltText("Content Step 1")).toEqual(null);
    expect(queryByAltText("Content Step 2")).toEqual(null);
    expect(getByLabelText("Content Step 3")).toBeDefined();

    fireEvent.click(continueButtom);
    expect(queryByAltText("Content Step 1")).toEqual(null);
    expect(queryByAltText("Content Step 2")).toEqual(null);
    expect(queryByAltText("Content Step 3")).toEqual(null);
    expect(getByText("Finished")).toBeDefined();
  });
});

describe("StepperFlow as status flow", () => {
  const initialSteps = [
    { type: "Step 1", state: StepperState.Completed },
    { type: "Step 2", state: StepperState.Ready },
    { type: "Step 3", state: StepperState.Ready },
  ];

  const stepperElement = <StepperFlow initialSteps={initialSteps}></StepperFlow>;

  it("should display only the stepper without content", () => {
    const { getByRole} = render(stepperElement);
    expect(getByRole("stepper-header")).toBeDefined();
    expect(getByRole("stepper-main-container").children.length).toBe(0);
  });
});
