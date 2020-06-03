import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const CountdownControlButtons = (props) => {
  const { timerStatus, startTimerValue, handleOnSwitchTimerStatus, handleOnResetTimer } = props;

  const buttonText = () => {
    switch (timerStatus) {
      case 'disabled': {
        return 'Start';
      }
      case 'pause': {
        return 'Continue';
      }
      case 'done': {
        return 'Start';
      }
      default: {
        return 'Pause';
      }
    }
  };

  return (
    <div className="countdown-control-buttons">
      <Button
        type="primary"
        size="large"
        onClick={handleOnSwitchTimerStatus}
        disabled={startTimerValue === 0}
      >
        {buttonText()}
      </Button>

      <Button
        type="danger"
        size="large"
        onClick={handleOnResetTimer}
        disabled={startTimerValue === 0}
      >
        Reset
      </Button>
    </div>
  );
};

CountdownControlButtons.propTypes = {
  timerStatus: propTypes.string,
  startTimerValue: propTypes.number,
  handleOnSwitchTimerStatus: propTypes.func,
  handleOnResetTimer: propTypes.func,
};

export default CountdownControlButtons;
