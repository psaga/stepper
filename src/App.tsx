import { ErrorBoundary } from "react-error-boundary";
import steps from "./mocks/steps.json";
import { StepperFlow } from "./components/StepperFlow/StepperFlow";
import { type Step } from "./types";
import { Navbar } from "./components/Navbar/Navbar";
import { Fallback } from "./Fallback";
import { useState } from "react";

function App() {
  const [someKey, setSomeKey] = useState(null);
  const title = "move-in";

  return (
    <ErrorBoundary FallbackComponent={Fallback} onReset={() => setSomeKey(null)} resetKeys={[someKey]}>
      <Navbar title={title}></Navbar>
      {steps.length > 0 && (
        <StepperFlow title={title} initialSteps={steps as Step[]}>
          <div>Flow 1</div>
          <div>Flow 2</div>
          <div>Flow 3</div>
        </StepperFlow>
      )}
    </ErrorBoundary>
  );
}

export default App;
