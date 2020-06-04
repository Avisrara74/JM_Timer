import React from 'react';
import propTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';
import 'antd/dist/antd.css';

const CountdownControlPanel = (props) => {
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

CountdownControlPanel.propTypes = {
  startTimerValue: propTypes.number,
  timerStatus: propTypes.string,
  handleOnMinutesInputChange: propTypes.func,
  handleOnSecondsInputChange: propTypes.func,
  handleOnSliderChange: propTypes.func,
};

CountdownControlPanel.defaultProps = {
  startTimerValue: 0,
  timerStatus: 'disabled',
  handleOnMinutesInputChange: null,
  handleOnSecondsInputChange: null,
  handleOnSliderChange: null,
};

export default CountdownControlPanel;
