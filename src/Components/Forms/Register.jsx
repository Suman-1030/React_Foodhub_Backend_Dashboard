import React,{useState} from 'react'
import { Api_path } from '../../vendorDashboard/data/Api_path'

function Register({Loginhandler}) {
 const [Username,setUsername]=useState("")
 const [Email,setEmail]=useState("")
 const [Password,setPassword]=useState("")
 const [Loading,setLoading]=useState(false)
 const [data,setdata]=useState('')

 const Formhandler= async (e)=>{

      e.preventDefault()
      try{
        setLoading(true)
        const response= await fetch(`${Api_path}/vendor/Register`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({Username,Email,Password})
        })
        
        const Data=await response.json()
        
        setLoading(false)
        
        if(response.ok){
          setdata(Data)
          alert("your registered successfully")
          Loginhandler()
        }
        if (!response.ok) {
          if (response.status === 400 && Data === "Email already taken") {
              alert('This email is already registered');
          }
        }
      }

      
      catch(error){
         console.log(error)
         alert("Registration failed") 
      
      }
    }

 {Loading ? (<p>Loading...</p>):(<p>{data}</p>)}
 
 
  return (
    
      <div className='Reg'>
       
        <form onSubmit={Formhandler}>
            <h2>Register Form</h2>
            <label>Username</label> 
            <input type='text' name='Username' placeholder='enter your username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <label>Email</label> 
            <input type='email' name='Email' placeholder='enter your email'  onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>Password</label> 
            <input type='password' name='Password' placeholder='enter your password'  onChange={(e)=>{setPassword(e.target.value)}}/><br/>

             <button type='submit'>Submit</button>
        </form>
      </div>
    
  )
}

export default Register
