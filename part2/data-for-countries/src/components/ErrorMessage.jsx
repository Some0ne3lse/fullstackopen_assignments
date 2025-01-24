const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>{errorMessage ? <p className="error">{errorMessage}</p> : null}</div>
  );
};

export default ErrorMessage;
