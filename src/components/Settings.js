import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseTimer, resetTimer, adjustElapsed, setTheme, setAnimation, toggleInvert, setLiquid, toggleSettings, togglePage, setFocus, setChill, setBigChill, getNextStep, toggleAutoStart, toggleSound } from "../actions";
import moment from "moment";
import classNames from "classnames";
import "./Settings.scss";

const Settings = () => {

  // STATE MANAGEMENT ///////////////////////////////////////////////

  // Global States
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Event listener handler
  useEffect(() => {
    if (settings.visible) {
      document.removeEventListener("keydown", keyHandler, false);
      document.addEventListener("keydown", keyHandler, false);
    } else {
      document.removeEventListener("keydown", keyHandler, false);
    }
    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  }, [settings.visible, settings.page]);

  // KEYPRESS EVENTS ////////////////////////////////////////////////

  // Handle keydown events
  const keyHandler = (event) => {
    if (event.code === "Tab") {
      event.preventDefault();
      dispatch(togglePage());
    }
  };

  // Stop and reset timer when the mode changes
  useEffect(() => {
    dispatch(resetTimer());
  }, [settings.mode]);

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  const formatTime = (time) => {
    return `${time / 60} min`;
  };

  const formatMode = (mode) => {
    if (mode === "bigChill") {
      return "big chill";
    } else if (mode === "chill") {
      return "lil chill";
    } else {
      return "focus";
    }
  };

  const getTimestamp = (seconds) => {
    const time = seconds < 0 ? 0 : seconds;
    return moment.utc(time * 1000).format("HH:mm:ss");
  };

  const playSound = (sound) => {
    if (settings.playSound) {
      const audio = new Audio(`/sounds/${sound}.mp3`);
      audio.play();
    }
  };

  // COMPONENT VARIABLES ////////////////////////////////////////////

  // CSS
  const settingsStyles = classNames({
    Settings: true,
    foreground: true,
    overlay: true,
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  // Elapsed time
  const elapsed = getTimestamp(settings.elapsed);

  // Total time
  let total = (4 * settings.focus) + (3 * settings.chill) + settings.bigChill;
  total = getTimestamp(total);

  return (
    <div className={settingsStyles}>

      <h2>Settings</h2>

      {/* Current Step */}
      <h4 className="current settings-toggle">
        <span className="option">current step:</span>
        <span className="value">
          {settings.step}/{settings.interval * 2} (<span className={settings.mode}>{formatMode(settings.mode)}</span>)
        </span>
      </h4>

      {/* Individual Settings Pages */}
      <div className="settings-page">

        {settings.page === 1 &&
          <>
            <h4 className="elapsed settings-toggle">
              <span className="option">elapsed time:</span>
              <span className="value">{elapsed}</span>
            </h4>
            <h4 className="settings-toggle font-green" onClick={() => {
              dispatch(increaseTimer(30));
              playSound("up");
            }}>
              +30 sec
            </h4>
            <h4 className="settings-toggle font-yellow" onClick={() => dispatch(getNextStep())}>
              skip current step
            </h4>
            <h4 className="settings-toggle font-red" onClick={() => {
              playSound("reset");
              dispatch(resetTimer());
            }}>
              reset current step
            </h4>
            <h4 className="settings-toggle font-blue" onClick={() => {
              playSound("reset");
              dispatch(adjustElapsed(0 - settings.elapsed));
            }}>
              reset elapsed time
            </h4>
            <h4 className="settings-toggle page-control" onClick={() => dispatch(togglePage())}>
              next page &gt;
            </h4>
          </>
        }

        {settings.page === 2 &&
          <>
            <h4 className="total settings-toggle">
              <span className="option">total time:</span>
              <span className="value">{total}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => {
              dispatch(setFocus("next"));
              playSound("up");
            }}>
              <span className="option">focus length:</span>
              <span className="value focus">{formatTime(settings.focus)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => {
              dispatch(setChill("next"));
              playSound("up");
            }}>
              <span className="option">lil chill length:</span>
              <span className="value chill">{formatTime(settings.chill)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => {
              dispatch(setBigChill("next"));
              playSound("up");
            }}>
              <span className="option">big chill length:</span>
              <span className="value bigChill">{formatTime(settings.bigChill)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(toggleAutoStart())}>
              <span className="option">autostart:</span>
              <span className="value">{settings.autoStart ? "on" : "off"}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(toggleSound())}>
              <span className="option">sound fx:</span>
              <span className="value">{settings.playSound ? "on" : "off"}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>
              <span className="option">bg color:</span>
              <span className={`value font-${settings.theme}`}>{settings.theme}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setLiquid("next"))}>
              <span className="option">milk color:</span>
              <span className={`value font-${settings.liquid}`}>{settings.liquid}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(toggleInvert())}>
              <span className="option">timer style:</span>
              <span className={`value ${settings.invert ? settings.mode : ""}`}>{settings.invert ? "inverted" : "default"}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setAnimation("next"))}>
              <span className="option">animation style:</span>
              <span className="value">{settings.animation}</span>
            </h4>
            <h5>TIP: To increase performance, set animation style to flat or off</h5>
            <h4 className="settings-toggle page-control" onClick={() => dispatch(togglePage())}>&lt; prev page</h4>
          </>
        }

      </div>

      {/* Close Button */}
      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>
        close
      </h3>

    </div>
  );

};

export default Settings;
