const ErrorAlert = ({ errors }) =>
  Array.isArray(errors) ? (
    <div>
      <h2>
        {errors.length === 1
          ? "There is an error in your submission"
          : `There are ${errors.length} errors in your submission`}
      </h2>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error.msg}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>{errors.message}</div>
  );

export default ErrorAlert;
