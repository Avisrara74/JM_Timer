import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const CountdownControlButtons = (props) => {
  const {
    startTimerValue, handleOnSwitchTimerStatus, handleOnResetTimer, UIStartButtonText,
  } = props;

  return (
    <div className="countdown-control-buttons">
      <Button
        type="primary"
        size="large"
        onClick={handleOnSwitchTimerStatus}
        disabled={startTimerValue === 0}
      >
        {UIStartButtonText}
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
  UIStartButtonText: propTypes.string,
  startTimerValue: propTypes.number,
  handleOnSwitchTimerStatus: propTypes.func,
  handleOnResetTimer: propTypes.func,
};

CountdownControlButtons.defaultProps = {
  timerStatus: 'disabled',
  UIStartButtonText: 'start',
  startTimerValue: 0,
  handleOnSwitchTimerStatus: null,
  handleOnResetTimer: null,
};

export default CountdownControlButtons;
