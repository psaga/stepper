import { StepperState, type Step } from "../../../types";
import styles from "./StepNode.module.scss";

type StepProps = {
  step: Step;
  isCurrentStep: boolean;
};

export const StepNode = ({ step, isCurrentStep }: StepProps) => {

  const stateStepStyle = step.state === StepperState.Completed ? "completed" : "ready";
  const currentStepStyle = isCurrentStep ? "active" : "";
  const stepClass = `${styles.step} ${stateStepStyle === "completed" ? styles.completed : styles.ready} ${
    currentStepStyle === "active" ? styles.active : ""
  }`;

  return (
    <div className={stepClass}>
      <span className={styles.state} aria-label={`${stateStepStyle} ${currentStepStyle}`}></span>
      <span className={styles.type} aria-label={step.type}>
        {step.type}
      </span>
    </div>
  );
};
