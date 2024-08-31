/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Teikna nálgun á hring sem TRIANGLE_FAN
//
//    Hjálmtýr Hafsteinsson, ágúst 2024
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// numCirclePoints er fjöldi punkta á hringnum
// Heildarfjöldi punkta er tveimur meiri (miðpunktur + fyrsti punktur kemur tvisvar)
var numCirclePoints = 20;       

var radius = 0.5;
var center = vec2(0, 0);

var points = [];
var program;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var pointSlider = document.getElementById("point-slider");
    pointSlider.style.width = canvas.width + "px";

    pointSlider.addEventListener("input", function (event) {
        numCirclePoints = parseInt(event.target.value);
        createCirclePoints();  
    });
    createCirclePoints();

    
}
// Create the points of the circle
function createCirclePoints()
{
    points = [];
    points.push( center );
    
    var dAngle = 2*Math.PI/numCirclePoints;
    for( i=numCirclePoints; i>=0; i-- ) {
    	a = i*dAngle;
    	var p = vec2( radius*Math.sin(a) + center[0], radius*Math.cos(a) + center[1] );
    	points.push(p);
    }
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    render();
}

function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    // Draw circle using Triangle Fan
    gl.drawArrays( gl.TRIANGLE_FAN, 0, numCirclePoints+2 );

    window.requestAnimFrame(render);
}
