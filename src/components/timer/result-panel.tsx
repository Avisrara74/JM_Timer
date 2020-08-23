import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/extensions
import formatterTime from '../helper';
import 'antd/dist/antd.css';
import './result-panel.css';

interface Props {
  currentTimerValue: number;
  timerStatus: string;
}

const TimerResult: React.FC<Props> = (props: Props) => {
  const { currentTimerValue, timerStatus } = props;

  const timerValue = formatterTime(currentTimerValue, timerStatus);

  const spinerClassNames =
    timerStatus === 'active' ? 'timer-spiner' : 'timer-spiner timer-spiner-disabled';

  const antIcon = <LoadingOutlined className={spinerClassNames} spin />;

  const timerClassNames =
    timerStatus === 'active'
      ? 'timer-result-value timer-result-value-active'
      : 'timer-result-value';

  return (
    <div className="timer-result">
      <div className="timer-result-progress-bar">
        <Spin indicator={antIcon} />
        <div className={timerClassNames}>{timerValue}</div>
      </div>
    </div>
  );
};

export default TimerResult;
