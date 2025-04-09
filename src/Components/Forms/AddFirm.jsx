import React, { useState } from "react";
import { Api_path } from "../../vendorDashboard/data/Api_path";

function AddFirm() {
  const [Firmname, setFirmname] = useState("");
  const [Area, setArea] = useState("");
  const [Category, setCategory] = useState([]);
  const [Region, setRegion] = useState([]);
  const [Offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  function Regionhandler(e) {
    const value = e.target.value;
    setRegion(Region.includes(value) ? Region.filter((item) => item !== value) : [...Region, value]);
  }

  function Categoryhandler(e) {
    const value = e.target.value;
    setCategory(Category.includes(value) ? Category.filter((item) => item !== value) : [...Category, value]);
  }

  async function Submithandler(e) {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("login Token");
      console.log(loginToken)
      if (!loginToken) {
        console.log("User not found");
        return;
      }

      const formData = new FormData();
      formData.append("Firmname", Firmname);
      formData.append("Area", Area);
      formData.append("Offer", Offer);

      Category.forEach((item) => formData.append("Category", item));
      Region.forEach((item) => formData.append("Region", item));

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${Api_path}/firm/add-firm`, {
        method: "POST",
        headers: {
          'Token':  `${loginToken}` 
        },
        body: formData,
      });
      

      const Data = await response.json();
      console.log(Data.firmId)
      const firmId= Data.firmId
      const firmName=Data.Firmname
      if (response.ok) {
        alert("Firm added successfully");
        console.log(firmId)
        localStorage.setItem('Firmid',firmId)
        localStorage.setItem('FirmName',firmName)
        window.location.reload()
      } else if (response.status === 404 && Data === "vendor not found") {
        alert("Vendor not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="addfirm">
      <form onSubmit={Submithandler}>
        <h2>ADD FIRM</h2>

        <label>Firm Name</label>
        <input type="text" placeholder="Enter your firm name" onChange={(e) => setFirmname(e.target.value)} />

        <label>Area</label>
        <input type="text" placeholder="Enter your area" onChange={(e) => setArea(e.target.value)} />

        <div className="cat">
          <label>Category</label>
          <div className="checkboxcontainer">
            <div>
              <label>Veg</label>
              <input type="checkbox" value="Veg" checked={Category.includes("Veg")} onChange={Categoryhandler} className="custom-checkbox veg-checkbox" />
            </div>
            <div>
              <label>Non-Veg</label>
              <input type="checkbox" value="Non-Veg" checked={Category.includes("Non-Veg")} onChange={Categoryhandler} className="custom-checkbox non-veg-checkbox"/>
            </div>
          </div>
        </div>

        <div className="cat">
          <label>Region</label>
          <div className="checkboxcontainer">
              
          <div>
              <label>South-indian</label>
              <input type="checkbox" value="South-indian" checked={Region.includes("South-indian")} onChange={Regionhandler} className="custom-checkbox region-checkbox"/>
            </div>
            <div>
              <label>North-indian</label>
              <input type="checkbox" value="North-indian" checked={Region.includes("North-indian")} onChange={Regionhandler} className="custom-checkbox region-checkbox"/>
            </div>
            <div>
              <label>Chinese</label>
              <input type="checkbox" value="Chinese" checked={Region.includes("Chinese")} onChange={Regionhandler} className="custom-checkbox region-checkbox"/>
            </div>
            <div>
              <label>Bekery</label>
              <input type="checkbox" value="Bekery" checked={Region.includes("Bekery")} onChange={Regionhandler} className="custom-checkbox region-checkbox"/>
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input type="text" placeholder="Enter offers" onChange={(e) => setOffer(e.target.value)} />

        <label>Firm Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default AddFirm;
