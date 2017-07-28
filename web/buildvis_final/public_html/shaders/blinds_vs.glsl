attribute vec3 vp;

uniform mat4 P, V, M;
uniform float y;

void main () {
	gl_Position = P * V * M * vec4 (vp.x, vp.y + y, vp.z, 1.0);
}
