import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import image1 from "./background_tshirt.png";
import image2 from "./gallery1.png";

import { fabric } from "fabric";

function App() {
  let canvRef = useRef(null);
  let [get, set] = useState([]);

  useEffect(() => {
    console.log(get.length);

    if (get.length > 0) {
      if (get.length > 1) {
        let pp = document.getElementsByTagName("canvas");
        console.log("pp", pp.length);
        for (let i = 1; i < pp.length; i++) {
          console.log(pp[i], "", i);
          pp[i].remove();
        }
      }
      var canvas = new fabric.Canvas("test");
      canvas.setHeight(400);
      canvas.setWidth(200);
      console.log(get.length);
      for (let i = 0; i < get.length; i++) {
        console.log(i, "iiiii");
        fabric.Image.fromURL(get[i], function (img) {
          img.scaleToHeight(100);
          img.scaleToWidth(100);
          if (get.length > 0) {
            canvas.centerObject(img);
          }
          canvas.add(img);
        });
      }
      canvas.add(new fabric.Text("really"));
      canvas.renderAll();
    }
  }, [get]);
  // for changing color
  function mycolor(e) {
    console.log("bhaiiiiiiiii");
    console.log(e.target.value);
    document.getElementById("tshirt-div").style.backgroundColor =
      e.target.value;
  }

  //creating canvas reference

  //uploading image
  function imageUpload(e) {
    var reader = new FileReader();
    reader.onload = async function (event) {
      var imgObj = await new Image();
      imgObj.src = await event.target.result;
      set([...get, imgObj.src]);
    };
    let p = e.target.files[0];

    reader.readAsDataURL(p);
  }

  return (
    <div className="App">
      <div id="tshirt-div">
        <img id="tshirt-backgroundpicture" src={image1} />

        <div id="drawingArea" className="drawing-area">
          <div className="canvas-container">
            <canvas
              ref={canvRef}
              id="test"
              style={{
                height: "400px",
                width: "200px",
                border: "5px solid black",
              }}
            ></canvas>
          </div>
        </div>
      </div>

      <label>T-Shirt Color:</label>
      <select id="tshirt-color" onChange={(e) => mycolor(e)}>
        <option value="#fff">White</option>
        <option value="#000">Black</option>
        <option value="#f00">Red</option>
        <option value="#008000">Green</option>
        <option value="#ff0">Yellow</option>
      </select>

      <label>Upload your own design:</label>
      <input
        type="file"
        multiple
        id="tshirt-custompicture"
        onChange={(e) => imageUpload(e)}
      />
    </div>
  );
}

export default App;
