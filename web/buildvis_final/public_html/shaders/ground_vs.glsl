attribute vec2 vp, vt;

uniform mat4 caster_P, caster_V, proj_mat, view_mat;

// point in the light's space
varying vec4 st_shadow;

varying vec2 st;
varying vec3 n_eye;

void main () {
	st = vt;
	// normal is fixed pointing upwards
	n_eye = vec3 (view_mat * vec4 (0.0, 1.0, 0.0, 0.0));
	// points y of xyz is always 0
	gl_Position = proj_mat * view_mat * vec4 (vp.x, 0.0, vp.y, 1.0);
	
	// create a shadow map texture coordinate by backwards-ising the position.
	st_shadow = caster_P * caster_V * vec4 (vp.x, 0.0, vp.y, 1.0);
	st_shadow.xyz /= st_shadow.w;
	st_shadow.xyz += 1.0;
	st_shadow.xyz *= 0.5;
}
