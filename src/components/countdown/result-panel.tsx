import React from 'react';
import { Progress } from 'antd';
// eslint-disable-next-line import/extensions
import getTimerValue from '../helper';
import 'antd/dist/antd.css';

interface Props {
  startTimerValue: number;
  currentTimerValue: number;
  timerStatus: string;
}

const CountdownResult: React.FC<Props> = (props: Props) => {
  const { startTimerValue, currentTimerValue, timerStatus } = props;
  const timerValue = getTimerValue(currentTimerValue, timerStatus);

  const percentOfProgress = (): number => {
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
          format={(): string => timerValue}
        />
      </div>
    </div>
  );
};

export default CountdownResult;
