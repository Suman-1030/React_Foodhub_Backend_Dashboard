import React, { useState } from 'react';
import { Api_path } from '../../vendorDashboard/data/Api_path';

function AddProduct() {
  const [Productname, setProductname] = useState('');
  const [Price, setPrice] = useState('');
  const [Bestseller, setBestseller] = useState(false);
  const [Category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [Description, setDescription] = useState('');

  function Categoryhandler(e) {
    const val = e.target.value;
    setCategory(Category.includes(val) ? Category.filter((item) => item !== val) : [...Category, val]);
  }

  function BestsellerHandler(e) {
    setBestseller(e.target.checked); 
  }

  async function Submithandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Productname', Productname);
      formData.append('Price', Price);
      formData.append('Bestseller', Bestseller.toString()); 
      formData.append('Description', Description);

      Category.forEach((cat) => {
        formData.append('Category', cat);
      });

      if (image) {
        formData.append('image', image);
      }

      const firmId = localStorage.getItem('FirmId') || localStorage.getItem('firmid');

      
      if (!firmId) {
        alert('Vendor not registered');
        return;
      }
      console.log("hi this iefdff:",firmId)
      const response = await fetch(`${Api_path}/Product/add-pr/${firmId}`, {
        method: 'POST',
        headers: {
          'FormId':  `${firmId}` 
        },
        body: formData,
      });
      
      const Data= await response.json();
      console.log("this is firmid :",Data);

      alert('Product added');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="addpr">
      <form onSubmit={Submithandler}>
        <h2>Add Product</h2>

        <label>Product Name</label>
        <input type="text" name="Productname" placeholder="Enter product name" onChange={(e) => setProductname(e.target.value)} />

        <label>Price</label>
        <input type="text" name="Price" placeholder="Enter product price" onChange={(e) => setPrice(e.target.value)} />

        <label>Bestseller</label>
        <div className="bs">
          <input type="checkbox" name="Bestseller" checked={Bestseller} onChange={BestsellerHandler} className="custom-checkbox region-checkbox"/>
        </div>

        <div className="cat">
          <label>Category</label>
          <div className="checkboxcontainer">
            <div>
              <label>Veg</label>
              <input type="checkbox" value="Veg" checked={Category.includes('Veg')} onChange={Categoryhandler} className="custom-checkbox veg-checkbox" />
            </div>
            <div>
              <label>Non-Veg</label>
              <input type="checkbox" value="Non-Veg" checked={Category.includes('Non-Veg')} onChange={Categoryhandler} className="custom-checkbox non-veg-checkbox"/>
            </div>
          </div>
        </div>

        <label>Product Description</label>
        <input type="text" placeholder="Enter product description" name="Description" onChange={(e) => setDescription(e.target.value)} />

        <label>Product Image</label>
        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
