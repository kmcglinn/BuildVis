attribute vec3 vp, vn;
attribute vec2 edge;

uniform mat4 proj_mat, view_mat;

varying vec3 n_eye;
varying vec2 f_edge;
varying float y_f;
varying float depth;
varying vec3 light_dir_eye;

void main () {
	y_f = vp.y;
	f_edge = edge;
	n_eye = vec3 (view_mat * vec4 (vn, 0.0));
	gl_Position = proj_mat * view_mat * vec4 (vp, 1.0);
	depth = -(view_mat * vec4 (vp, 1.0)).z;
	light_dir_eye = normalize ((view_mat * vec4 (-0.7071,-0.6645,0.2418, 0.0)).xyz);
}
