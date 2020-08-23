import * as React from 'react';
// eslint-disable-next-line import/extensions
import TimerResultPanel from './result-panel';
// eslint-disable-next-line import/extensions
import TimerControlButtons from './control-buttons';

interface State {
  timerStatus: string;
  UIStartButtonText: string;
  currentTimerValue: number;
}

const defaultState: State = {
  timerStatus: 'disabled', // active, pause, disabled
  UIStartButtonText: 'Start', // Start, Continue, Pause
  currentTimerValue: 0,
};

class Timer extends React.Component<{}, State> {
  timerID: any;

  constructor(props: {}) {
    super(props);
    this.state = defaultState;
  }

  changeTimerStatus = (timerStatus: string, currentTimerValue: number): string => {
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

  handleOnSwitchTimerStatus = (): void => {
    const { timerStatus, currentTimerValue } = this.state;
    const changeTimerStatus = this.changeTimerStatus(timerStatus, currentTimerValue);
    this.setState(() => ({
      timerStatus: changeTimerStatus,
    }));
  };

  handleOnResetTimer = (): void => {
    this.setState(() => ({ ...defaultState }));
  };

  increaseTimer = (): void => {
    const { currentTimerValue, timerStatus } = this.state;
    if (timerStatus !== 'active') {
      this.setTimerPause();
      return;
    }
    this.setState(() => ({ currentTimerValue: currentTimerValue + 1 }));
  };

  setTimerPause = (): void => {
    clearTimeout(this.timerID);
  };

  setTimerActive = (): void => {
    const updateTimer = (): void => {
      this.increaseTimer();
      this.timerID = setTimeout(updateTimer, 1000);
    };
    updateTimer();
  };

  componentWillUnmount = (): void => {
    this.setTimerPause();
  };

  render(): React.ReactElement {
    const { timerStatus, currentTimerValue, UIStartButtonText } = this.state;

    return (
      <div>
        <TimerResultPanel currentTimerValue={currentTimerValue} timerStatus={timerStatus} />
        <TimerControlButtons
          UIStartButtonText={UIStartButtonText}
          handleOnSwitchTimerStatus={this.handleOnSwitchTimerStatus}
          handleOnResetTimer={this.handleOnResetTimer}
        />
      </div>
    );
  }
}

export default Timer;
