import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Login from '../Components/Forms/Login'
import Register from '../Components/Forms/Register'
import AddFirm from '../Components/Forms/AddFirm'
import AddProduct from '../Components/Forms/AddProduct'
import Welcome from '../Components/Welcome'
import AllProducts from './../Components/AllProducts';




function Landingpage() {

const [showLogin,setshowLogin]=useState(false)
const [showRegister,setshowRegister]=useState(false)
const [Addproduct,setAddproduct]=useState(false)
const [Addfirm,setAddfirm]=useState(false)
const [showWelcome,setshowWelcome]=useState(false)
const [Allproducts,setAllproducts]=useState(false)
const [Logout,setLogout]=useState(false)
const [Showaddfirm,setShowaddfirm]=useState(true)




 function Loginhandler(){
  setshowLogin(true)
  setshowRegister(false)
  setAddproduct(false)
  setAddfirm(false)
  setshowWelcome(false)
  setAllproducts(false)
 }
 function Registerhandler(){
  setshowRegister(true)
  setshowLogin(false)
  setAddproduct(false)
  setAddfirm(false)
  setshowWelcome(false)
  setAllproducts(false)
 }
 function Producthandler(){
  if(!Logout){
    alert("please login to add product")
    setshowLogin(true)
    return
  }
  setAddproduct(true)
  setAddfirm(false)
  setshowLogin(false)
  setshowRegister(false)
  setshowWelcome(false)
  setAllproducts(false)
 }

 function Firmhandler(){
  if(!Logout){
    alert("please login to add firm")
    setshowLogin(true)
    return
  }
  
  setAddfirm(true)
  setAddproduct(false)
  setshowLogin(false)
  setshowRegister(false)
  setshowWelcome(false)
  setAllproducts(false)


 }
 function Welcomehandler(){
  setAddfirm(false)
  setAddproduct(false)
  setshowLogin(false)
  setshowRegister(false)
  setshowWelcome(true)
  setAllproducts(false)
 }
 function AllProductshandler(){
  if(!Logout){
    alert("please register or login to see list of products")
    setshowLogin(true)
    return
  }
   setAllproducts(true)
   setshowLogin(false)
   setshowRegister(false)
   setAddproduct(false)
   setAddfirm(false)
   setshowWelcome(false)
 }

 useEffect(()=>{
  const Token=localStorage.getItem('login Token')
  if(Token){
    setLogout(true)
  }
 },[])

 useEffect(()=>{
  const Firmname=localStorage.getItem('FirmName')
  if(Firmname){
    setShowaddfirm(false)
  }
 },[])

function Logouthandler(){
  localStorage.removeItem('login Token')
  localStorage.removeItem('Firmid')
  localStorage.removeItem('Vendorid')
  localStorage.removeItem('FirmName')
  window.location.reload()
  
  setLogout(false)

}

  return (
    <div>
        <Navbar Loginhandler={Loginhandler} Registerhandler={Registerhandler}  Logout={Logout} Logouthandler={Logouthandler} />
        <div className='adjuster'>
             <Sidebar Firmhandler={Firmhandler} Producthandler={Producthandler}  AllProductshandler={AllProductshandler}  Showaddfirm={Showaddfirm} />
             {showLogin && <Login  Welcomehandler={Welcomehandler}/> }
             {showRegister && <Register Loginhandler={Loginhandler}/>}
             {showWelcome&& <Welcome/>}
             {Addfirm && Logout && <AddFirm/>}
             {Addproduct && Logout && <AddProduct/>}
             {Allproducts && Logout && <AllProducts/>}
             
        </div>
    </div>
  )
}

export default Landingpage
