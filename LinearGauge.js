/** @class LinearGauge - draw a linear movement analog gauge.
*   @author https://github.com/DavesCodeMusings/htmlGauges
*/
class LinearGauge {
  /**
   * Create a linear gauge on an existing html canvas.
   * 
   * @constructor
   * @param {string} canvasId       The id of the canvas to draw upon.
   * @param {string} label          A text label written on the gauge face.
   * @param {number} deflection     The initial position of the indicator needle.
   */
  constructor(canvasId, label, deflection) {
    this.canvasId = canvasId;
    this.label = label;
    if (deflection === undefined) deflection = 0;
    this.deflection = deflection;
    this.draw(this.deflection);
  }
  draw(deflection) {
    let context = document.getElementById(this.canvasId).getContext("2d");
    let height = document.getElementById(this.canvasId).height;
    let width = document.getElementById(this.canvasId).width;
    let scaleStartX, scaleStartY, scaleEndX, scaleEndY, labelY, needleStartX, needleStartY, needleEndX, needleEndY = 0;

    if (height < width) {
      scaleStartX = 0.01 * width;
      scaleStartY = height / 2;
      scaleEndX = 0.99 * width;
      scaleEndY = height / 2;
      needleStartX = scaleEndX * deflection;
      needleStartY = 0;
      needleEndX = needleStartX;
      needleEndY = 0.95 * height;

      labelY = 0.75 * height;
    }
    else {
      scaleStartX = width / 2;
      scaleStartY = 0.01 * height;
      scaleEndX = width / 2;
      scaleEndY = 0.99 * height;
      needleStartX = 0;
      needleStartY = scaleEndY - scaleEndY * deflection;
      needleEndX = width * 0.95;
      needleEndY = needleStartY;
      labelY = 0.95 * height;
    }

    // Clear the canvas.
    context.clearRect(0, 0, width, height);

    // Draw the scale.
    context.beginPath();
    context.lineWidth = 3;
    context.fillStyle = 'white';
    context.strokeStyle = 'lightgray';
    context.moveTo(scaleStartX, scaleStartY);
    context.lineTo(scaleEndX, scaleEndY);
    context.fill();
    context.stroke();

    // Label it.
    context.beginPath();
    context.fillStyle = 'black';
    context.textBaseline = 'bottom';
    context.textAlign = 'center';
    context.fillText(this.label, width / 2, labelY);

    // Draw the needle.
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'red';
    context.lineCap = 'round';
    context.moveTo(needleStartX, needleStartY);
    context.lineTo(needleEndX, needleEndY);
    context.stroke();

    // Cover the needle with a proportionally-sized cap.
    //let capRadius = Math.max(Math.round(needleLength / 20), 4);
    let capRadius = 5;
    context.beginPath();
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.arc(needleStartX, needleStartY, capRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }
}