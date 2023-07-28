import Navbar from "./components/Navbar";
import React from "react";
import MyForm from "./components/MyForm";
import Feed from './components/Feed';


export default function Forum () {

  // fetch all feed from sql database
  return <>
   <Navbar/>
   <div style={{ marginTop: "90px" }}>
            <hr/>
         </div>
    <Feed/>

         <h3> Please leave your comments down below! </h3>
   <MyForm />
  </>
}
