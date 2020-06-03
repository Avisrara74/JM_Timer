import React from 'react';
import CountdownControlPanel from './Countdown/control-panel/control-panel';
import CountdownResult from './Countdown/result-panel/result-panel';
import CountdownControlButtons from './Countdown/control-buttons/control-buttons';
import timerDoneSignal from './Countdown/timer-done-signal.mp3';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimerValue: 0,
      minutes: 0,
      seconds: 0,
      startTimerValue: 0,
      timerStatus: 'disabled', // active, pause, disabled, done
    };
  }

  handleOnMinutesInputChange = (minutes) => {
    const { seconds } = this.state;
    const getValidMinutes = () => {
      if (minutes > 720) return 720;
      if (typeof minutes === 'string') return 0;
      return minutes;
    };

    const newStartTimerValue = getValidMinutes() * 60 + seconds;
    this.setState({
      minutes: getValidMinutes(),
      startTimerValue: newStartTimerValue,
    });
  };

  handleOnSecondsInputChange = (seconds) => {
    const { minutes } = this.state;
    const getValidSeconds = () => {
      if (seconds > 59) return 59;
      if (typeof seconds === 'string' || minutes >= 720) return 0;
      return seconds;
    };

    const newStartTimerValue = minutes * 60 + getValidSeconds();
    this.setState({
      seconds: getValidSeconds(),
      startTimerValue: newStartTimerValue,
    });
  };

  handleOnSliderChange = (sliderValue) => {
    const minutes = Math.floor(sliderValue / 60);
    const seconds = sliderValue - minutes * 60;
    this.setState({
      minutes,
      seconds,
      startTimerValue: sliderValue,
    });
  };

  handleOnSwitchTimerStatus = () => {
    const { timerStatus, startTimerValue } = this.state;

    const newTimerStatus = () => {
      switch (timerStatus) {
        case 'disabled': {
          this.setState({ currentTimerValue: startTimerValue });
          this.timerActive();
          return 'active';
        }
        case 'active': {
          this.timerPause();
          return 'pause';
        }
        case 'pause': {
          this.timerActive();
          return 'active';
        }
        case 'done': {
          this.setState({ currentTimerValue: startTimerValue });
          this.timerActive();
          return 'active';
        }
        default:
          return 'active';
      }
    };
    this.setState({ timerStatus: newTimerStatus() });
  };

  handleOnResetTimer = () => {
    this.setState({
      timerStatus: 'disabled',
      minutes: 0,
      seconds: 0,
      startTimerValue: 0,
      currentTimerValue: 0,
    });
  };

  decreaseTimerBySecond = () => {
    const { currentTimerValue, timerStatus } = this.state;
    if (timerStatus === 'disabled') this.timerPause();
    else if (currentTimerValue === 0) {
      this.timerPause();
      const audio = new Audio(timerDoneSignal);
      audio.volume = 0.2;
      audio.play();
      this.setState({ timerStatus: 'done' });
    } else if (timerStatus === 'active') {
      this.setState({ currentTimerValue: currentTimerValue - 1 });
    }
  };

  timerPause = () => {
    clearInterval(this.timerID);
  };

  timerActive = () => {
    this.timerID = setInterval(() => this.decreaseTimerBySecond(), 1000);
  };

  componentWillUnmount = () => {
    this.timerPause();
  };

  render() {
    const { minutes, seconds, startTimerValue, timerStatus, currentTimerValue } = this.state;

    return (
      <div>
        <CountdownControlPanel
          minutes={minutes}
          seconds={seconds}
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
          timerStatus={timerStatus}
          startTimerValue={startTimerValue}
          handleOnSwitchTimerStatus={this.handleOnSwitchTimerStatus}
          handleOnResetTimer={this.handleOnResetTimer}
        />
      </div>
    );
  }
}
export default Timer;
