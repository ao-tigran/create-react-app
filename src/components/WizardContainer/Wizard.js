import React, { useEffect, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Wizard as AlbusWizard, Steps, Step } from 'react-albus';
import WizardContext from '../../context/WizardContext';

import styles from './index.module.scss';

const Wizard = (props) => {
  const {
    match: { url },
    history,
    stepContainers,
  } = props;
  const [activeStep, setActiveStep] = useContext(WizardContext);

  const push = useCallback(
    (step) => {
      const path = `${url}/${step.id}`;
      history.push(path);
    },
    [history, url],
  );

  const goTo = useCallback(
    (step, params) => {
      push(step, params);
      setActiveStep(step.id);
    },
    [push, setActiveStep],
  );

  const stepPath = (stepIndex) => {
    if (stepContainers[stepIndex] && !stepContainers[stepIndex].isBlocked()) {
      return stepContainers[stepIndex];
    }
    return null;
  };

  useEffect(
    () => () => {
      // every time wizard step changes this code works
      window.scrollTo(0, 0);
      // clear wizard error
    },
    [activeStep],
  );

  useEffect(() => {
    const { pathname } = history.location;
    const id = pathname.replace(`${url}/`, '');

    const step = stepContainers.find((s) => s.id === id);

    if (step && step.isBlocked()) {
      history.push('/');
    }
    if (step && step.id) {
      setActiveStep(step.id);
    }
  }, [history, setActiveStep, stepContainers, url, goTo]);

  return (
    <div>
      <AlbusWizard
        history={history}
        basename={url}
        render={({ step }) => (
          <div>
            <div className={styles.wizard_page}>
              <Steps step={step.id && step}>
                {stepContainers.map((s) => {
                  const { id } = s;
                  const StepContent = s.content;

                  const wizardBag = {
                    goNext: (params) => {
                      const index = stepContainers.indexOf(s);
                      const nextStep = stepPath(index + 1);
                      if (nextStep) {
                        goTo(nextStep, params);
                      }
                    },
                    goPrevious: (params) => {
                      const index = stepContainers.indexOf(s);
                      const previousStep = stepPath(index - 1);

                      if (previousStep) {
                        goTo(previousStep, params);
                      }
                    },
                    config: stepContainers,
                    step: s,
                  };

                  return (
                    <Step id={id} key={id}>
                      <StepContent
                        goNext={wizardBag.goNext}
                        goPrevious={wizardBag.goPrevious}
                        config={wizardBag.config}
                        step={wizardBag.step}
                      />
                    </Step>
                  );
                })}
              </Steps>
            </div>
          </div>
        )}
      />
    </div>
  );
};

Wizard.propTypes = {
  stepContainers: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.func,
      id: PropTypes.string,
      isBlocked: PropTypes.func,
    }),
  ),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

Wizard.defaultProps = {
  stepContainers: [],
  match: {
    url: '',
  },
  history: {},
};

export default withRouter(Wizard);
