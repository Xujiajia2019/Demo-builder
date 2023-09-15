function Input ({
  label,
  value,
  setValue
}) {
  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <div>
      <label className="label">
        <span>{label}</span>
      </label>
      <input value={value} onChange={handleChange} type="text" placeholder="Type here" className="input text-dark input-bordered w-full" />
    </div>
  )
}

export default Input;
