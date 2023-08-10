import * as XLSX from 'xlsx';

function ProductsFileUpload(props) {

  function handleChange(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      props.setProductFile(jsonData);
    }
    reader.readAsArrayBuffer(file);
  }

  return (
    <div>
      <label className="label">
        <span>Upload your products file:</span>
      </label>
      <input onChange={handleChange} type="file" className="file-input file-input-bordered w-full" />
    </div>
  )
}

export default ProductsFileUpload;
