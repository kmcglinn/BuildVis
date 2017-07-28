attribute vec2 vp, vt;
uniform mat4 M, V, P;
varying vec2 st;

void main () {
	st = vt;
	gl_Position = P * V * M * vec4 (vp, 0.0, 1.0);
}
