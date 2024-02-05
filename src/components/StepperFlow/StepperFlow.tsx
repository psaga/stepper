import { Children, ReactNode, cloneElement, isValidElement, useState } from "react";
import { StepperState, type Step } from "../../types";
import { StepNode } from "./StepNode/StepNode";
import styles from "./StepperFlow.module.scss";

type StepperProps = {
  title?: string;
  initialSteps: Step[];
  children?: ReactNode;
};

export const StepperFlow = ({ title, initialSteps, children }: StepperProps) => {
  const [steps, setSteps] = useState(initialSteps);
  const initialStep = steps.findIndex((step) => step.state !== StepperState.Completed);
  const [currentStep, setCurrentStep] = useState(initialStep !== -1 ? initialStep : steps.length - 1);
  const [validateStep, setValidateStep] = useState(true);
  const [flowFinished, setFlowFinished] = useState(initialStep === -1);
  
  const childArray = Children.toArray(children);
  const childElement = childArray[currentStep];
  
  const buttonText = currentStep !== steps.length - 1 ? "Continue" : `Complete ${title}`;
  const handleNextStep = () => {
    if (children && validateStep) {
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => (index === currentStep ? { ...step, state: StepperState.Completed } : step)),
      );
      if (currentStep + 1 < steps.length) {
        setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
      } else {
        setFlowFinished(true);
      }
    }
  };

  if(steps.length !== childArray.length && childArray.length !== 0) throw new Error ("The length of the steps and child array must match");
  
  return (
    <>
      <div className={styles.stepper} role="stepper-header">
        {steps.map((step: Step, stepIdx: number) => (
          <StepNode step={step} key={stepIdx} isCurrentStep={stepIdx === currentStep} />
        ))}
      </div>
      <div className={styles.mainContainer} role="stepper-main-container">
        {children &&
          (!flowFinished ? (
            <>
              <div className={styles.content} aria-label={'Content ' + steps[currentStep].type}>
                {childElement &&
                  isValidElement(childElement) &&
                  (childElement.props.setValidateStep !== undefined
                    ? cloneElement(childElement, {
                        ...childElement.props,
                        setValidateStep,
                      })
                    : childElement)}
              </div>
              <div className={styles.footer}>
                <button onClick={handleNextStep} aria-label={buttonText}>
                  {buttonText}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.finished}>Finished</div>
          ))}
      </div>
    </>
  );
};
