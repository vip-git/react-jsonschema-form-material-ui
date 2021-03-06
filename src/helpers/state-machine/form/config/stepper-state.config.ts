// Actions
type StepperActions = {
    DO_STEP_CHANGE: 'doStepChange';
};

type StepperStateEvents = {
    ON_STEP_CHANGE: 'stepChange',
    ON_STEP_NEXT: 'onFormNext',
    ON_STEP_BACK: 'onFormBack',
    ON_STEP_SKIP: 'onFormSkip',
    ON_STEP_RESET: 'onFormReset',
};

export type StepperStateMachineConfig = {
    STEPPER_ACTIONS: StepperActions;
    STEPPER_STATE_EVENTS: StepperStateEvents;
}

export const STEPPER_STATE_CONFIG: StepperStateMachineConfig = {
  // List of rules to execute
  STEPPER_ACTIONS: {
    DO_STEP_CHANGE: 'doStepChange',
  },
  STEPPER_STATE_EVENTS: {
    ON_STEP_CHANGE: 'stepChange',
    ON_STEP_BACK: 'onFormBack',
    ON_STEP_NEXT: 'onFormNext',
    ON_STEP_RESET: 'onFormReset',
    ON_STEP_SKIP: 'onFormSkip',
  },
};

export default STEPPER_STATE_CONFIG;
