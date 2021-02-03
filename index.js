import {
  vsSource, 
  fsSource,
  initShaderProgram, 
  initBuffers, 
  drawScene,
  buildProgramInfoObj
} from './mozillaCode'




function main() {

  var squareRotation = 0.0;

  const canvas = document.querySelector("#glcanvas")

  // Initialize the GL context
  const gl = canvas.getContext("webgl")

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = buildProgramInfoObj(gl, shaderProgram)

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl)

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, squareRotation);
    squareRotation += deltaTime

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


}

window.onload = main

