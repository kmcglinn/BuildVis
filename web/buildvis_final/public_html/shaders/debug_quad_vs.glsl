attribute vec2 vp, vt;
varying vec2 st;

void main () {
	st = vt;
	gl_Position = vec4 (vp, 0.0, 1.0);
}

