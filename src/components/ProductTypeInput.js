function ProductTypeInput(props) {

  function handleChange(event) {
    props.setProductType(event.target.value);
  }
  return (
    <div>
      <label className="label">
        <span>What is your product type?</span>
      </label>
      <input value={props.productType} onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
    </div>
  )
}

export default ProductTypeInput;
