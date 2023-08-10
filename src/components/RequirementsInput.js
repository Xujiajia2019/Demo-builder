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
      <p className="text-left text-gray-400 mt-2">Show my main product, highlight the key features, introduce about the brand...</p>
    </div>
  )
}

export default InputRequirements