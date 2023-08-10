function BuinessNameInput(props) {

  function handleChange(event) {
    props.setBuinessName(event.target.value);
  }
  return (
    <div>
      <label className="label">
        <span>What is your buiness name?</span>
      </label>
      <input value={props.buinessName} onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
    </div>
  )
}

export default  BuinessNameInput;
