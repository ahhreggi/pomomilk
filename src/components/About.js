import PropTypes from "prop-types";

const About = (props) => {

  About.propTypes = {
    onClose: PropTypes.func,
  };

  return (
    <div className="About foreground overlay">

      {/* Overlay Header */}
      <h2>Pomomilk</h2>
      <h3>A simple interactive pomodoro timer</h3>
      <h4>by Maria Regina Sirilan</h4>

      {/* Info Box */}
      <p>The <span>Pomodoro Technique</span> is a time management method that involves breaking down work into intervals called &quot;pomodoros&quot; (typically 25 min). These are separated by short breaks (3-5 min), with every fourth being a longer break (15-30 min).</p>

      {/* GitHub Link */}
      <h4 className="settings-toggle">
        <a href="https://github.com/ahhreggi/pomomilk" target="_blank" rel="noreferrer">
          See project on GitHub
        </a>
      </h4>

      {/* Close Button */}
      <h3 className="settings-toggle close" onClick={() => props.onClose(false)}>
        close
      </h3>

    </div>
  );

};

export default About;