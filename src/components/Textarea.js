function Textarea ({
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
      <textarea value={value} onChange={handleChange} type="text" placeholder="Type here" className="textarea input-bordered w-full" />
    </div>
  )
}

export default Textarea;
