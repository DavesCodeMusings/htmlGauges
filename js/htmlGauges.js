/** @class AnalogGauge - draw an analog gauge on an html canvas */
class AnalogGauge {
  /**
   * Create an analog gauge on an html canvas.
   * 
   * @constructor
   * @author https://github.com/DavesCodeMusings/htmlGauges
   * @param {string} canvasId   The id of the canvas to draw upon.
   * @param {string} label      A text label written on the gauge face.
   * @param {number} deflection The initial position of the indicator needle.
   */
  constructor(canvasId, label, deflection) {
    this.canvasId = canvasId;
    this.label = label;
    if (deflection === undefined) deflection = 0;
    this.deflection = deflection;
    this.draw(this.deflection);
  }

  /**
   * Draw the gauge onto the canvas.
   * @param {number} deflection A value from 0 to 100, representing the deflection of the needle.
   */
  draw(deflection) {
    let context = document.getElementById(this.canvasId).getContext("2d");
    let height = document.getElementById(this.canvasId).height;
    let width = document.getElementById(this.canvasId).width;
    let scaleZero, scaleFull, scaleCenterX, scaleCenterY, needleLength, labelY = 0;

    // Square canvas gets a big round gauge. Rectangles get half.
    if (height === width) {
      scaleFull = 2.25 * Math.PI;
      scaleZero = 0.75 * Math.PI;
      scaleCenterX = width / 2;
      scaleCenterY = height / 2;
      needleLength = height / 2;
      labelY = height * 0.75;
    }
    else if (height < width) {
      scaleZero = 1.25 * Math.PI;
      scaleFull = 1.75 * Math.PI;
      scaleCenterX = width / 2;
      scaleCenterY = height;
      needleLength = height;
      labelY = height / 2;
    }

    // Clear the canvas.
    context.clearRect(0, 0, width, height);

    // Draw the scale.
    context.beginPath();
    context.lineWidth = 3;
    context.fillStyle = 'white';
    context.strokeStyle = 'lightgray';
    context.arc(scaleCenterX, scaleCenterY, 0.9 * needleLength, scaleZero, scaleFull);
    context.fill();
    context.stroke();

    // Label it.
    context.beginPath();
    context.fillStyle = 'black';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(this.label, width / 2, labelY);

    // Draw the needle.
    let radians = scaleZero + (scaleFull - scaleZero) * deflection;
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'red';
    context.lineCap = 'round';
    context.moveTo(scaleCenterX, scaleCenterY);
    context.lineTo(scaleCenterX + needleLength * Math.cos(radians), scaleCenterY + needleLength * Math.sin(radians));
    context.stroke();

    // Cap the needle.
    context.beginPath();
    context.strokeStyle = 'black';
    context.arc(scaleCenterX, scaleCenterY, 5, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }
}