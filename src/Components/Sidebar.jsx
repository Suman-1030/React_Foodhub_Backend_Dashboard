import React from 'react'


function Sidebar({Producthandler,Firmhandler,AllProductshandler,Showaddfirm}) {
  return (
    <div className="sidebarsection">
      <ul>
            {Showaddfirm && <li onClick={Firmhandler}>Add Firm</li>}
             <li onClick={Producthandler}>Add Product</li>
             <li onClick={AllProductshandler}>All Products</li>
             <li>User Details</li>

        </ul>
    </div>
  )
}

export default Sidebar
