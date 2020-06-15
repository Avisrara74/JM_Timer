import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const TimerControlButtons = (props) => {
  const { handleOnSwitchTimerStatus, handleOnResetTimer, UIStartButtonText } = props;

  return (
    <div className="timer-control-buttons">
      <Button type="primary" size="large" onClick={handleOnSwitchTimerStatus}>
        {UIStartButtonText}
      </Button>

      <Button type="danger" size="large" onClick={handleOnResetTimer}>
        Reset
      </Button>
    </div>
  );
};

TimerControlButtons.propTypes = {
  UIStartButtonText: propTypes.string,
  handleOnSwitchTimerStatus: propTypes.func,
  handleOnResetTimer: propTypes.func,
};

TimerControlButtons.defaultProps = {
  UIStartButtonText: 'Start',
  handleOnSwitchTimerStatus: null,
  handleOnResetTimer: null,
};

export default TimerControlButtons;
