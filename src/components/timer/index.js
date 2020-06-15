import React from 'react';
import TimerResultPanel from './result-panel';
import TimerControlButtons from './control-buttons';

const defaultState = {
  timerStatus: 'disabled', // active, pause, disabled
  UIStartButtonText: 'Start', // Start, Continue, Pause
  currentTimerValue: 0,
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  changeTimerStatus = (timerStatus, currentTimerValue) => {
    switch (timerStatus) {
      case 'disabled': {
        this.setState(() => ({
          currentTimerValue,
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
      default:
        return 'active';
    }
  };

  handleOnSwitchTimerStatus = () => {
    const { timerStatus, currentTimerValue } = this.state;
    const changeTimerStatus = this.changeTimerStatus(timerStatus, currentTimerValue);
    this.setState(() => ({
      timerStatus: changeTimerStatus,
    }));
  };

  handleOnResetTimer = () => {
    this.setState(() => ({ ...defaultState }));
  };

  increaseTimer = () => {
    const { currentTimerValue, timerStatus } = this.state;
    if (timerStatus !== 'active') {
      this.setTimerPause();
      return;
    }
    this.setState(() => ({ currentTimerValue: currentTimerValue + 1 }));
  };

  setTimerPause = () => {
    clearTimeout(this.timerID);
  };

  setTimerActive = () => {
    const updateTimer = () => {
      this.increaseTimer();
      this.timerID = setTimeout(updateTimer, 1000);
    };
    updateTimer();
  };

  componentWillUnmount = () => {
    this.setTimerPause();
  };

  render() {
    const { timerStatus, currentTimerValue, UIStartButtonText } = this.state;

    return (
      <div>
        <TimerResultPanel currentTimerValue={currentTimerValue} timerStatus={timerStatus} />
        <TimerControlButtons
          UIStartButtonText={UIStartButtonText}
          currentTimerValue={currentTimerValue}
          handleOnSwitchTimerStatus={this.handleOnSwitchTimerStatus}
          handleOnResetTimer={this.handleOnResetTimer}
        />
      </div>
    );
  }
}

export default Timer;
