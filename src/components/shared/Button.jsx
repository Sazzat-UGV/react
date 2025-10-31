import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <div>
      <button className="lg:mx-5 md:py-0 group relative w-max">
        <span className="font-roboto">{text}</span>
        <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-primary group-hover:w-full"></span>
      </button>
    </div>
  );
};
// props-type validation
Button.propTypes = {
  text: PropTypes.string,
};
export default Button;
