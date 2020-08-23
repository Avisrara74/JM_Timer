import React from 'react';
import { Slider, InputNumber } from 'antd';
import 'antd/dist/antd.css';

interface Props {
  startTimerValue: number;
  timerStatus: string;
  handleOnMinutesInputChange: any;
  handleOnSecondsInputChange: any;
  handleOnSliderChange: any;
}

const CountdownControlPanel: React.FC<Props> = (props: Props) => {
  const {
    startTimerValue,
    timerStatus,
    handleOnMinutesInputChange,
    handleOnSecondsInputChange,
    handleOnSliderChange,
  } = props;

  const minutes = Math.floor(startTimerValue / 60);
  const seconds = startTimerValue % 60;

  const switchPanelStatus = timerStatus === 'active' || timerStatus === 'pause';
  return (
    <div className="countdown-start-panel">
      <div className="countdown-start-panel-inputs">
        <span>Minutes: </span>
        <InputNumber
          min={0}
          max={720}
          value={minutes}
          onChange={handleOnMinutesInputChange}
          disabled={switchPanelStatus}
        />
        <br />
        <br />
        <span>Seconds: </span>
        <InputNumber
          min={0}
          max={59}
          value={seconds}
          onChange={handleOnSecondsInputChange}
          disabled={switchPanelStatus}
        />
      </div>
      <div className="countdown-start-panel-slider">
        <Slider
          min={0}
          max={3600}
          step={15}
          value={startTimerValue}
          onChange={handleOnSliderChange}
          disabled={switchPanelStatus}
        />
      </div>
    </div>
  );
};

export default CountdownControlPanel;
