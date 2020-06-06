import React from 'react';
import propTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import getTimerValue from '../result-panel-component-funcs';
import 'antd/dist/antd.css';
import './result-panel.css';

const TimerResult = (props) => {
  const { currentTimerValue, timerStatus } = props;

  const timerValue = getTimerValue(currentTimerValue);

  const spinerClassNames = (timerStatus === 'active')
    ? 'timer-spiner' : 'timer-spiner timer-spiner-disabled';

  const antIcon = <LoadingOutlined className={spinerClassNames} spin />;

  const timerClassNames = (timerStatus === 'active')
    ? 'timer-result-value timer-result-value-active'
    : 'timer-result-value';

  return (
    <div className="timer-result">
      <div className="timer-result-progress-bar">
        <Spin indicator={antIcon} />
        <div className={timerClassNames}>
          {timerValue}
        </div>
      </div>
    </div>
  );
};

TimerResult.propTypes = {
  timerStatus: propTypes.string,
  currentTimerValue: propTypes.number,
};

TimerResult.defaultProps = {
  timerStatus: 'disabled',
  currentTimerValue: 0,
};

export default TimerResult;
