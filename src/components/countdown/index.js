import React from 'react';
import CountdownControlPanel from './control-panel';
import CountdownResult from './result-panel';
import CountdownControlButtons from './control-buttons';
import timerDoneSignal from './done-signal.mp3';

const getValidMinutes = (minutes) => {
  if (minutes > 720) return 720;
  if (typeof minutes === 'string') return 0;
  return minutes;
};

const getValidSeconds = (minutes, seconds) => {
  if (seconds > 59) return 59;
  if (typeof seconds === 'string' || minutes >= 720) return 0;
  return seconds;
};

const defaultState = {
  timerStatus: 'disabled', // active, pause, disabled, done
  UIStartButtonText: 'Start', // Start, Continue, Pause
  startTimerValue: 0,
  currentTimerValue: 0,
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleOnMinutesInputChange = (minutes) => {
    const { startTimerValue } = this.state;
    const seconds = startTimerValue % 60;

    const newStartTimerValue = getValidMinutes(minutes) * 60 + seconds;

    this.setState(() => ({
      startTimerValue: newStartTimerValue,
      timerStatus: 'disabled',
    }));
  };

  handleOnSecondsInputChange = (seconds) => {
    const { startTimerValue } = this.state;
    const minutes = Math.floor(startTimerValue / 60);

    const newStartTimerValue = minutes * 60 + getValidSeconds(minutes, seconds);
    this.setState(() => ({
      startTimerValue: newStartTimerValue,
      timerStatus: 'disabled',
    }));
  };

  handleOnSliderChange = (sliderValue) => {
    this.setState(() => ({
      startTimerValue: sliderValue,
      timerStatus: 'disabled',
    }));
  };

  changeTimerStatus = (timerStatus, startTimerValue) => {
    switch (timerStatus) {
      case 'disabled': {
        this.setState(() => ({
          currentTimerValue: startTimerValue,
          UIStartButtonText: 'Pause',
        }));
        this.setTimerActive();
        return 'active';
      }
      case 'active': {
        this.setTimerPause();
        this.setState(() => ({
          UIStartButtonText: 'Continue',
        }));
        return 'pause';
      }
      case 'pause': {
        this.setTimerActive();
        this.setState(() => ({
          UIStartButtonText: 'Pause',
        }));
        return 'active';
      }
      case 'done': {
        this.setState(() => ({
          currentTimerValue: startTimerValue,
          UIStartButtonText: 'Pause',
        }));
        this.setTimerActive();
        return 'active';
      }
      default:
        return 'active';
    }
  };

  handleOnSwitchTimerStatus = () => {
    const { timerStatus, startTimerValue } = this.state;
    const changeTimerStatus = this.changeTimerStatus(timerStatus, startTimerValue);
    this.setState(() => ({
      timerStatus: changeTimerStatus,
    }));
  };

  handleOnResetTimer = () => {
    this.setState(() => ({ ...defaultState }));
  };

  decreaseTimer = () => {
    const { currentTimerValue, timerStatus } = this.state;
    if (timerStatus !== 'active') {
      this.setTimerPause();
      return;
    }

    if (currentTimerValue <= 0) {
      this.setTimerPause();
      const audio = new Audio(timerDoneSignal);
      audio.volume = 0.2;
      audio.play();
      this.setState(() => ({ timerStatus: 'done', UIStartButtonText: 'Start' }));
    } else {
      this.setState(() => ({ currentTimerValue: currentTimerValue - 1 }));
    }
  };

  setTimerPause = () => {
    clearTimeout(this.timerID);
  };

  setTimerActive = () => {
    const updateTimer = () => {
      this.decreaseTimer();
      this.timerID = setTimeout(updateTimer, 1000);
    };
    updateTimer();
  };

  componentWillUnmount = () => {
    this.setTimerPause();
  };

  render() {
    const {
      startTimerValue, timerStatus, currentTimerValue, UIStartButtonText,
    } = this.state;

    return (
      <div>
        <CountdownControlPanel
          startTimerValue={startTimerValue}
          timerStatus={timerStatus}
          handleOnMinutesInputChange={this.handleOnMinutesInputChange}
          handleOnSecondsInputChange={this.handleOnSecondsInputChange}
          handleOnSliderChange={this.handleOnSliderChange}
        />
        <CountdownResult
          startTimerValue={startTimerValue}
          currentTimerValue={currentTimerValue}
          timerStatus={timerStatus}
        />
        <CountdownControlButtons
          UIStartButtonText={UIStartButtonText}
          startTimerValue={startTimerValue}
          handleOnSwitchTimerStatus={this.handleOnSwitchTimerStatus}
          handleOnResetTimer={this.handleOnResetTimer}
        />
      </div>
    );
  }
}
export default Timer;
