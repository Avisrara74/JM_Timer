import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

interface Props {
  startTimerValue: number;
  handleOnSwitchTimerStatus: any;
  handleOnResetTimer: any;
  UIStartButtonText: string;
}

const CountdownControlButtons: React.FC<Props> = (props: Props) => {
  const {
    startTimerValue,
    handleOnSwitchTimerStatus,
    handleOnResetTimer,
    UIStartButtonText,
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

      <Button size="large" onClick={handleOnResetTimer} disabled={startTimerValue === 0}>
        Reset
      </Button>
    </div>
  );
};

export default CountdownControlButtons;
