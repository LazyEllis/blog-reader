const Input = ({ label, type, name, value, onChange }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Input;
