import { useState } from "react";
import Rainbow from "../assets/Rainbow.png";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import ThanksScreen from "./ThanksScreen";
const FormBox = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ThanksScreen />
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <div
      className="absolute top-[5%] left-[30%] blur-none w-1/3 h-[90%] rounded-4xl shadow-2xl/50 bg-no-repeat bg-cover px-10 py-10 flex justify-center overflow-hidden"
      style={{ backgroundImage: `url(${Rainbow})` }}
    >
      {renderStep()}
    </div>
  );
};

export default FormBox;
