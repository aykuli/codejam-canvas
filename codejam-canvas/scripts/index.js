"use strict";
let colors;
var canvas = document.getElementById("canvas");
let canvasWidth = canvas.getBoundingClientRect().width;
let canvasHeight = canvas.getBoundingClientRect().height;

function draw(colors) {
  let rowLength = colors.length;
  let columnLength = colors[0].length;

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    colors.forEach((row, i) => {
      row.forEach((column, j) => {
        ctx.fillStyle = "#" + column;
        ctx.fillRect(
          i * (canvasWidth / rowLength),
          j * (canvasHeight / columnLength),
          canvasWidth / rowLength,
          canvasHeight / columnLength
        );
      });
    });
  }
}

function RGBToHex(data) {
  let dataHex = [];

  data.forEach((row, i) => {
    dataHex.push([]);
    row.forEach((column, j) => {
      let color = data[i][j];

      let colorHex = ((color[0] << 16) + (color[1] << 8) + color[2]).toString(16);
      dataHex[i].push(colorHex);
    });
  });
  return dataHex;
}

function drawImage(imageSrc) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    let pic = new Image();
    pic.src = imageSrc;
    pic.onload = function() {
      ctx.drawImage(pic, 0, 0, canvasWidth, canvasHeight);
    };
  }
}

let myRequest;

document.getElementById("draw").addEventListener("click", () => {
  let drawSelecterValue =
    document.forms.drawSelectorForm.elements.drawSelector.value;

  if (drawSelecterValue === "draw32x32") {
    myRequest = new Request("../assets/data/32x32.json");
  } else if (drawSelecterValue === "draw4x4") {
    myRequest = new Request("../assets/data/4x4.json");
  } else if (drawSelecterValue === "RSSchoolIcon") {
    drawImage("../assets/data/image.png");
  }

  fetch(myRequest)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      if (drawSelecterValue === "draw32x32") {
        data = RGBToHex(data);
        draw(data);
      } else if (drawSelecterValue === "draw4x4") {
        draw(data);
      } else if (drawSelecterValue === "RSSchoolIcon") {
        drawImage("./assets/data/image.png");
      }
    });
});
