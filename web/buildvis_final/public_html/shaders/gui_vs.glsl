attribute vec3 vp;
attribute vec2 vt;

uniform mat4 model_mat;

varying vec2 st;

void main () {
	st = vt;
	gl_Position = model_mat * vec4 (vp, 1.0);
}
