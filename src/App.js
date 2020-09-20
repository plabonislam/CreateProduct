import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import image1 from "./background_tshirt.png";
import image2 from "./gallery1.png";

import { fabric } from "fabric";

function App() {
  let canvRef = useRef(null);
  let [get, set] = useState([]);
  let [getText, setText] = useState([]);
 var canvas;
  //clear canvas each time new object added
  const clearCanvas = () => {
    let pp = document.getElementsByTagName("canvas");
    console.log("pp", pp.length);
    for (let i = 1; i < pp.length; i++) {
      console.log(pp[i], "", i);
      pp[i].remove();
    }
  };

  //on adding image from dropdown this image this section works
  useEffect(() => {
    clearCanvas(); //clear canvas

    if (get.length > 0) {
       canvas = new fabric.Canvas("test");
      canvas.setHeight(400);
      canvas.setWidth(200);
      console.log(get.length);

      drawImage(canvas);

      if (getText.length > 0) {
        for (let i = 0; i < getText.length; i++) {
          canvas.add(new fabric.Text(getText[i]));
        }
      }
      canvas.renderAll();
    }
  }, [get]);

  //uploading image saved in state
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

  //onchange if text this section works
  useEffect(() => {
    clearCanvas();

    if (getText.length > 0) {
       canvas = new fabric.Canvas(canvRef.current);
      canvas.setHeight(400);
      canvas.setWidth(200);

      for (let i = 0; i < getText.length; i++) {
        canvas.add(new fabric.Text(getText[i]));
      }

      if (get.length > 0) {
        drawImage(canvas);
      }
    }
  }, [getText]);

  // draw image based on saved value
  const drawImage = (canvas) => {
    for (let i = 0; i < get.length; i++) {
      fabric.Image.fromURL(get[i], function (img) {
        img.scaleToHeight(100);
        img.scaleToWidth(100);
        if (get.length > 0) {
          canvas.centerObject(img);
        }
        canvas.add(img);
      });
    }
    canvas.renderAll();
  };

  // for changing color
  function mycolor(e) {
    console.log("bhaiiiiiiiii");
    console.log(e.target.value);
    document.getElementById("tshirt-div").style.backgroundColor =
      e.target.value;
  }

  //text is saved for state
  const handleText = () => {
    let value = document.getElementById("text").value;
    document.getElementById("text").value = "";
    console.log(value, "PPPPPPPPPPPP");

    setText([...getText, value]);
  };



  const deleteItem=(e)=>{

console.log("myyyyyyy")
  }


  function download() {
    let pl=canvRef.current;
    
   pl= pl.toDataURL();
  
    console.log(pl)
    let image=document.createElement("img");
    image.src=pl
    image.style.border="1px solid red"
 document.querySelector(".App").appendChild(image);
  }
  return (
    <div className="App">
      <div id="tshirt-div">
        <img id="tshirt-backgroundpicture" src={image1} />

        <div
          id="drawingArea"
          className="drawing-area"
          onKeyPress={(e) => deleteItem(e)}
        >
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

      <div style={{ margin: "10px" }}>
        <input type="text" id="text" placeholder="type your text" />
        <button onClick={handleText}> Submit Text</button>
      </div>
      <img  id="show"/>
      <div>
        
          <button type="button" onClick={download}>
            Download
          </button>
        
      </div>
    </div>
  );
}

export default App;
