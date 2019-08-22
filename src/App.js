import React from 'react';
import './App.scss';

const CLOSE_TIMEOUT = 30;
const IDLE_TIMEOUT = 60;

class App extends React.PureComponent {
  idleTimer = null;
  inactivePopupTimer = null;
  persistTimer = null;

  state = {
    isInactivePopupShow: false,
    inactiveCloseTimeRemaining: CLOSE_TIMEOUT,
    persistTime: 0,
  };

  componentDidMount() {
    // Setup event listeners to reset timer
    window.addEventListener('mousemove', this.resetIdleTimer, false);
    window.addEventListener('mousedown', this.resetIdleTimer, false);
    window.addEventListener('keypress', this.resetIdleTimer, false);
    window.addEventListener('DOMMouseScroll', this.resetIdleTimer, false);
    window.addEventListener('mousewheel', this.resetIdleTimer, false);
    window.addEventListener('touchmove', this.resetIdleTimer, false);
    window.addEventListener('MSPointerMove', this.resetIdleTimer, false);

    this.startIdleTimer();

    // Show persistent timer
    this.persistTimer = setInterval(() => {
      this.setState(prevState => ({
        persistTime: prevState.persistTime + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.resetIdleTimer);
    window.removeEventListener('mousedown', this.resetIdleTimer);
    window.removeEventListener('keypress', this.resetIdleTimer);
    window.removeEventListener('DOMMouseScroll', this.resetIdleTimer);
    window.removeEventListener('mousewheel', this.resetIdleTimer);
    window.removeEventListener('touchmove', this.resetIdleTimer);
    window.removeEventListener('MSPointerMove', this.resetIdleTimer);
  }

  startIdleTimer = () => {
    this.idleTimer = setTimeout(this.handleInactive, IDLE_TIMEOUT * 1000);
  };

  resetIdleTimer = (e) => {
    // Reset timer, since user interacted
    window.clearTimeout(this.idleTimer);

    // Do some action
    this.handleActive();

    // Restart timer
    this.startIdleTimer();
  };

  handleActive = () => {
    console.log('You are active now');
    this.setState({
      persistTime: 0,
    });
  };

  handleInactive = () => {
    console.log('You are inactive now');
    // Show popup and start countdown
    this.showInactivePopup();
  };

  showInactivePopup = () => {
    // Show inactive popup
    clearInterval(this.inactivePopupTimer);

    this.setState({
      inactiveCloseTimeRemaining: CLOSE_TIMEOUT,
      isInactivePopupShow: true,
    }, () => {
      this.inactivePopupTimer = setInterval(() => {
        if (this.state.inactiveCloseTimeRemaining > 0) {
          this.setState(prevState => ({
            inactiveCloseTimeRemaining: prevState.inactiveCloseTimeRemaining - 1,
          }));
        } else {
          // Apply various close techniques to close window by script
          window.CloseWindow();
          window.CloseOpenerWindow();
          window.CloseOpenerHikks();
          window.CloseWithWindowOpenTrick();
        }
      }, 1000);
    });
  };

  closeInactivePopup = () => {
    this.setState({
      isInactivePopupShow: false,
    }, () => {
      clearInterval(this.inactivePopupTimer);
    });
  };

  render() {
    const {
      isInactivePopupShow,
      inactiveCloseTimeRemaining,
      persistTime,
    } = this.state;

    return (
      <div className="App">
        {persistTime}s Passed Idle
        {isInactivePopupShow && (
          <div className="close-popup">
            <span>
              You have been idle for {IDLE_TIMEOUT} s.
            </span>
            <span>
              Window will be closed after {inactiveCloseTimeRemaining} s
            </span>
            <button onClick={this.closeInactivePopup}>I am here!</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
