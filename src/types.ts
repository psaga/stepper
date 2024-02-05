export enum StepperState {
  Ready = "ready",
  Completed = "completed",
}

export type Step = {
  type: string;
  state: StepperState;
};

export interface ChildRef {
  submitForm: () => Promise<boolean>;
}
