/** @class Rounded90Gauge - draw a rounded analog gauge with a 90 degree deflection.
*   @author https://github.com/DavesCodeMusings/htmlGauges
*/
class Rounded90Gauge {
  /**
   * Create a half-round analog gauge on an html canvas, vertically or horizontally.
   * 
   * @constructor
   * @author https://github.com/DavesCodeMusings/htmlGauges
   * @param {string} canvasId       The id of the canvas to draw upon.
   * @param {string} label          A text label written on the gauge face.
   * @param {number} deflection     The initial position of the indicator needle.
   * @param {boolean} bezel         A half-round border will be drawn if true.
   * @param {boolean} antiClockwise Flips gauge and needle travel direction.
   */
  constructor(canvasId, label, deflection, bezel, antiClockwise) {
    this.canvasId = canvasId;
    this.label = label;
    if (deflection === undefined) deflection = 0;
    this.deflection = deflection;
    if (bezel == undefined) bezel = false;
    this.bezel = bezel;
    if (antiClockwise === undefined) antiClockwise = false;
    this.antiClockwise = antiClockwise;
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
    let scaleZero, scaleFull, scaleCenterX, scaleCenterY, radius, labelY = 0;

    if (height < width && !this.antiClockwise) {
      scaleZero = 1.25 * Math.PI;
      scaleFull = 1.75 * Math.PI;
      scaleCenterX = width / 2;
      scaleCenterY = height;
      radius = height;
      labelY = height / 2;
    }
    else if (height < width && this.antiClockwise) {
      scaleZero = 0.75 * Math.PI;
      scaleFull = 0.25 * Math.PI;
      scaleCenterX = width / 2;
      scaleCenterY = 0;
      radius = height;
      labelY = height / 2;
    }
    else if (height > width && !this.antiClockwise) {
      scaleZero = 0.75 * Math.PI;
      scaleFull = 1.25 * Math.PI;
      scaleCenterX = width;
      scaleCenterY = height / 2;
      radius = width;
      labelY = height / 2;
    }
    else if (height > width && this.antiClockwise) {
      scaleZero = 2.25 * Math.PI;
      scaleFull = 1.75 * Math.PI;
      scaleCenterX = 0;
      scaleCenterY = height / 2;
      radius = width;
      labelY = height / 2;
    }

    // Clear the canvas and draw the face.
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.lineWidth = 1;
    context.fillStyle = 'white';
    context.strokeStyle = 'lightgray';
    context.arc(scaleCenterX, scaleCenterY, radius, 0, 2*Math.PI);
    context.fill();
    if (this.bezel) context.stroke();

    // Draw the scale.
    context.beginPath();
    context.lineWidth = 3;
    context.fillStyle = 'white';
    context.strokeStyle = 'lightgray';
    context.arc(scaleCenterX, scaleCenterY, 0.8 * radius, scaleZero, scaleFull, this.antiClockwise);
    context.fill();
    context.stroke();

    // Label it.
    context.beginPath();
    context.fillStyle = 'black';
    context.textBaseline = 'bottom';
    context.textAlign = 'center';
    context.fillText(this.label, width / 2, labelY);

    // Draw the needle.
    let radians = scaleZero + (scaleFull - scaleZero) * deflection;
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'red';
    context.lineCap = 'round';
    context.moveTo(scaleCenterX, scaleCenterY);
    context.lineTo(scaleCenterX + 0.9 * radius * Math.cos(radians), scaleCenterY + 0.9 * radius * Math.sin(radians));
    context.stroke();

    // Cover the needle with a proportionally-sized cap.
    let capRadius = Math.max(Math.round(radius / 20), 4);
    context.beginPath();
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.arc(scaleCenterX, scaleCenterY, capRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }
}
