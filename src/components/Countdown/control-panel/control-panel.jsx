import React from 'react';
import propTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';
import 'antd/dist/antd.css';

const CountdownControlPanel = (props) => {
  const {
    minutes,
    seconds,
    startTimerValue,
    timerStatus,
    handleOnMinutesInputChange,
    handleOnSecondsInputChange,
    handleOnSliderChange,
  } = props;

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

CountdownControlPanel.propTypes = {
  minutes: propTypes.number,
  seconds: propTypes.number,
  startTimerValue: propTypes.number,
  timerStatus: propTypes.string,
  handleOnMinutesInputChange: propTypes.func,
  handleOnSecondsInputChange: propTypes.func,
  handleOnSliderChange: propTypes.func,
};

export default CountdownControlPanel;
