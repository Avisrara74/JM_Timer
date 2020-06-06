import React from 'react';
import propTypes from 'prop-types';
import { Progress } from 'antd';
import getTimerValue from '../result-panel-component-funcs';
import 'antd/dist/antd.css';

const CountdownResult = (props) => {
  const { startTimerValue, currentTimerValue, timerStatus } = props;
  const timerValue = getTimerValue(currentTimerValue, timerStatus);

  const percentOfProgress = () => {
    if (timerStatus === 'disabled') return 0;

    const passedTime = startTimerValue - currentTimerValue;
    return Math.floor((passedTime / startTimerValue) * 100);
  };

  const strokeColor = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  return (
    <div className="countdown-result">
      <div className="countdown-result-progress-bar">
        <Progress
          type="circle"
          percent={percentOfProgress()}
          strokeColor={strokeColor}
          format={() => timerValue}
        />
      </div>
    </div>
  );
};

CountdownResult.propTypes = {
  startTimerValue: propTypes.number,
  currentTimerValue: propTypes.number,
  timerStatus: propTypes.string,
};

CountdownResult.defaultProps = {
  startTimerValue: 0,
  currentTimerValue: 0,
  timerStatus: 'disabled',
};

export default CountdownResult;
