var gl;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [vec2(-1, -1), vec2(1, -1), vec2(1, 1),
    vec2(-1, -1), vec2(1, 1), vec2(-1, 1)];

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    locTime = gl.getUniformLocation(program, "time");

    iniTime = Date.now();

    canvasRes = vec2(canvas.width, canvas.height);
    gl.uniform2fv(gl.getUniformLocation(program, "resolution"), flatten(canvasRes));

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    var msek = Date.now() - iniTime;
    gl.uniform1f(locTime, msek);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    window.requestAnimFrame(render);
}
