function InputRequirements(props) {
  function handleChange(event) {
    props.setRequirements(event.target.value);
  }
  return (
    <div>
      <label className="label">
        <span>What is your requirements?</span>
      </label>
      <input value={props.requirements}
        onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
    </div>
  )
}

export default InputRequirements