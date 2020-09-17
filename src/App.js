import React, { useEffect, useRef } from "react";

import "./App.css";
import image1 from "./background_tshirt.png";
import image2 from "./gallery1.png";

import { fabric } from "fabric";
function App() {
  let canvRef = useRef(null);


// for changing color
  function mycolor(e) {
    console.log("bhaiiiiiiiii");
    console.log(e.target.value);
    document.getElementById("tshirt-div").style.backgroundColor =
      e.target.value;
  }

  //creating canvas reference
  let canvas = new fabric.Canvas(canvRef.current);
  
  //uploading image
  async function imageUpload(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.set({
          angle: 0,
          padding: 10,
          cornersize: 10,
          height: 110,
          width: 110,
        });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
        console.log("last");
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  //upload image

  // document.getElementById("imgLoader").onchange = function handleImage(e) {
  //   var reader = new FileReader();
  //   reader.onload = function (event) {
  //     var imgObj = new Image();
  //     imgObj.src = event.target.result;
  //     imgObj.onload = function () {
  //       var image = new fabric.Image(imgObj);
  //       image.set({
  //         angle: 0,
  //         padding: 10,
  //         cornersize: 10,
  //         height: 110,
  //         width: 110,
  //       });
  //       canvas.centerObject(image);
  //       canvas.add(image);
  //       canvas.renderAll();
  //     };
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // function updateTshirtImage(e) {
  //   console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYY")
  //   console.log(e.target.value);
  //   let imageURL= e.target.value;
  //   console.log(e.target.value,"hhhhhhhhh");

  //   fabric.Image.fromURL(imageURL, function (img) {
  //     img.scaleToHeight(300);
  //     img.scaleToWidth(300);
  //     canvas.centerObject(img);
  //     canvas.add(img);
  //     canvas.renderAll();
  //   });
  // }

  return (
    <div className="App">
      <div id="tshirt-div">
        <img id="tshirt-backgroundpicture" src={image1} />

        <div id="drawingArea" className="drawing-area">
          <div className="canvas-container">
            <canvas
              ref={canvRef}
              style={{
                height: "400px",
                width: "200px",
                border: "5px solid black",
              }}
            ></canvas>
          </div>
        </div>
      </div>
      {/* 
      <select id="tshirt-design" onChange={(e) => updateTshirtImage(e)}>
        <option value="testt">Select one of our designs ...</option>
        <option value={image2}>Batman</option>
      </select> */}

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
