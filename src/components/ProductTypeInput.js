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
      <p className="text-left text-gray-400 mt-2">Phones, Earphones, E-bike......</p>
    </div>
  )
}

export default ProductTypeInput;
