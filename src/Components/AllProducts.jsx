import React,{useState,useEffect} from 'react'
import { Api_path } from '../vendorDashboard/Data/api_path'


function AllProducts() {

const [Products,setProducts]=useState([])

 async function Getproducts(){
    
    try{
        
          
    const FirmId= localStorage.getItem('Firmid')
    if (!FirmId) {
        console.log("FirmId not found in localStorage");
        return;
      }

    const response = await fetch(`${Api_path}/Product/getprs/${FirmId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data= await response.json()
    setProducts(data.products)
    console.log("hi this :",data)

   }
   catch(error){
    console.log(error)
   }
}

useEffect(() => {
    Getproducts();
}, []);


async function DeleteProductById(ProductId){
    confirm("do you really want to Delete the Product")
    try{
        console.log(ProductId)
        const response= await fetch(`${Api_path}/Product/Delpr/${ProductId}`,
           {method:'DELETE'}
        )
        if(response.ok){
            setProducts(Products.filter((e)=> e._id!==ProductId));
           
            alert("Product Deleted successfully")
        }
    }
    catch(error){
        console.log(error)
    }
}



  return (
    <div className='Table'>
        <div>
            {Products.length==0 ? (
                <p>NO PRODUCTS</p>
            ): (<table className='pr-table'>
                  <thead>
                    <tr>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th>Image</th>
                        <th>DELETE</th>
                    </tr>
                  </thead>
                       <tbody>
                        {Products.map((e)=>{

                            return(

                                    <tr key={e._id} >
                                        <td>{e.Productname}</td>
                                        <td>{e.Price}</td>
                                        <td>{e.image && (
                                            <img src={`${Api_path}/uploads/${e.image}`}  alt= {e.Productname}/>
                                        )}</td>
                                         
                                        <td><button onClick={()=>DeleteProductById(e._id)}>Delete</button></td>
                                    </tr>









                            )
                        })}
                       </tbody>
            </table>)}
        </div>
    </div>
  )
}

export default AllProducts
