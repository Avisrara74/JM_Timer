import React from 'react';
import propTypes from 'prop-types';
import { Progress } from 'antd';
import 'antd/dist/antd.css';

const CountdownResult = (props) => {
  const { startTimerValue, currentTimerValue, timerStatus } = props;

  const timerStr = () => {
    const min = Math.floor(currentTimerValue / 60);
    const sec = currentTimerValue % 60;
    if (currentTimerValue === 0 && timerStatus === 'done') return 'Done';
    return `${min} : ${sec}`;
  };

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
          format={() => timerStr()}
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

export default CountdownResult;
