import React,{useState} from 'react'
import { Api_path } from '../../vendorDashboard/Data/api_path'

function Login({Welcomehandler}) {
const [Email,setEmail]=useState("")
const [Password,setPassword]=useState("")
const [data,setdata]=useState("")



const Loginhandler=async (e)=>{
  
    e.preventDefault()
    try{
      const response=await fetch(`${Api_path}/vendor/Login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Email,Password})
      } )
     const Data=await response.json()
     if(response.ok){
       alert("Login Successful")
       setEmail("")
       setPassword("")
       localStorage.setItem('login Token',Data.token)
       localStorage.setItem('Vendorid',Data.VendorId)
       setdata(Data)
       Welcomehandler()

       
       const vendorId=localStorage.getItem('Vendorid')
       if (vendorId) {
        const response = await fetch(`${Api_path}/vendor/single-Rec/${vendorId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      
        const result = await response.json();
      
        if(response.ok){


          const firm= result.vendor?.firm?.[0]

          if(firm?._id && firm?.Firmname){
            localStorage.setItem('FirmName', firm.Firmname);
            localStorage.setItem('Firmid', firm._id);
           } 
         else {
              console.warn("Firm data missing or incomplete.");
            }

          }
         
         else {
               console.warn("Failed to fetch vendor details.");
        }
      
     }
     if(!response.ok){
        if ((response.status===404) &&(Data.msg=="Vendor not found")){
          alert("vendor not Registered")
        }
        if ((response.status===400) &&(Data.msg=="Invalid password")){
          alert("Incorrect password")
        }
     }
     window.location.reload()
    }

   
  }

    catch(error){
        console.log(error)
        alert("Login failed")
    }
  }


  return (
    
    <div className="login">
     
        <form onSubmit={Loginhandler}>
            <h2>Login Form</h2><br/>
            <label>Email</label>
            <input type='email' name='Email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email'/><br/>
            <label>Password</label>
            <input type='password' name='Password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password'/><br/>

            <button type='submit'>Submit</button>
        </form>
      
    </div>
  )
}

export default Login
