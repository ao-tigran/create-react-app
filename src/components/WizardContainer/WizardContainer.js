import React, { useState } from 'react';
import Wizard from './Wizard';
import WizardContext from '../../context/WizardContext';
import Step1 from '../Step1';
import Step2 from '../Step2';

const WizardContainer = () => {
  const [activeStep, setActiveStep] = useState('');

  const blockStep1 = () => true;
  const blockStep2 = () => false;

  const stepContainers = [
    {
      id: 'step1',
      content: Step1,
      isBlocked: blockStep1,
    },
    {
      id: 'step2',
      content: Step2,
      isBlocked: blockStep2,
    },
  ];

  return (
    <div>
      <div>Wizard</div>
      <WizardContext.Provider value={[activeStep, setActiveStep]}>
        <Wizard stepContainers={stepContainers} />
      </WizardContext.Provider>
    </div>
  );
};

export default WizardContainer;
