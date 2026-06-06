import { createTheme, Stepper } from '@mantine/core';
import classes from './theme.module.css';

export const theme = createTheme({
  components: {
    Stepper: Stepper.extend({
      defaultProps: {
        color: 'green',
        size: 'sm',
      },
      classNames: {
        root: classes.stepperRoot,
        step: classes.stepperStep,
        stepIcon: classes.stepperStepIcon,
        stepCompletedIcon: classes.stepperStepCompletedIcon,
        stepLabel: classes.stepperStepLabel,
        separator: classes.stepperSeparator,
      },
    }),
  },
});
