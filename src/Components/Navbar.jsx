import React,{ useState} from 'react'

function Navbar({Loginhandler,Registerhandler,Logout,Logouthandler}) {

  const firmname=localStorage.getItem('FirmName')

 
  

  return (
    <div className="nav">

    
      
        <div className="Company">
            Vendor Dashboard
        </div> 


        <div>FirmName : {firmname}</div> 


        <div>  
        {Logout ? (
  <span onClick={Logouthandler}>Logout</span>
) : (
  <div>
    <span onClick={Loginhandler}>Login/</span>
    <span onClick={Registerhandler}>Register</span>
  </div>
  
)}
 </div>
   
        </div>
      
   
  )
}

export default Navbar
