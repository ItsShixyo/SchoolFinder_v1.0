const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not available here.")
}

gl.clearColor(1, 0, 0, 0);


let vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]), gl.STATIC_DRAW);

vertexBuffer.itemSize = 3;
vertexBuffer.numItems = 3;

let identityMatrix = [1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1];

function translation(tx, ty, tz) {
    return [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1]
}


let vertexShader_source = 'attribute vec3 a_position;' + 'uniform mat4 u_move;' + 'uniform mat4 u_rotation;' + 'void main() { gl_Position = u_rotation * u_move * vec4 (a_position,1); }';
//let vertexShader_source = 'attribute vec3 a_position;' + 'uniform mat4 u_move;' + 'void main() { gl_Position = mat4(1, 1, 1, 1) * vec4 (a_position,1); }';
let fragmentShader_source = 'precision mediump float;' + 'void main() { gl_FragColor = vec4 (0.9,0,0.1,1); }';


function createRotationMatrixZ(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
        cos, -sin, 0, 0,
        sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}


//Compile shaders
let buildShader = (shaderSource, typeOfShader) => {
    let shader = gl.createShader(typeOfShader);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
    }
    return shader;
}

let compiledVertexShader = buildShader(vertexShader_source, gl.VERTEX_SHADER);
let compiledFragmentShader = buildShader(fragmentShader_source, gl.FRAGMENT_SHADER);

//setup GLSL program
program = gl.createProgram();
gl.attachShader(program, compiledVertexShader);
gl.attachShader(program, compiledFragmentShader);
gl.linkProgram(program);


let positionLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionLocation);
gl.useProgram(program);


// Angle de rotation en radians
let angleInRadians = Math.PI / 2; // Par exemple, une rotation de 45 degrés

// Créer la matrice de rotation
let rotationMatrix = createRotationMatrixZ(angleInRadians);

// Passez la matrice de rotation au shader
let rotationLocation = gl.getUniformLocation(program, "u_rotation");
gl.uniformMatrix4fv(rotationLocation, false, new Float32Array(rotationMatrix));


let tx = 0, ty = 0, tz = 0;
let translate = gl.getUniformLocation(program, "u_move");
gl.uniformMatrix4fv(translate, false, new Float32Array(identityMatrix));
gl.vertexAttribPointer(positionLocation, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

//Draw
let start_time = 0;
let animate = function (time) {
    let dt = time - start_time;
    tx += 0.5;
    translation((dt * tx), 0, 0);
    console.log(dt);
    console.log(tx);



    start_time = time;
    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems);
    window.requestAnimationFrame(animate);
}
animate(0);
