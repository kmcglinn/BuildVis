precision mediump float;

varying vec3 n_eye;
varying vec2 f_edge;
varying float y_f;
varying float depth;
varying vec3 light_dir_eye;
// used for ambient light intensity
uniform vec4 colour;

vec3 phong () {
	const vec3 L_d = vec3 (0.4, 0.4, 0.2);
	float dp = max (0.0, dot (-light_dir_eye, n_eye));
	vec3 I_d = L_d * 0.75 * dp;
	
	return I_d + colour.xyz * 0.75;
}

void main () {
	float h = f_edge.x * f_edge.y;

	gl_FragColor = vec4 (0.8, 0.8, 0.8, 1.0);
	
	float dfac = depth / 30.0;
	
	float wfac = 0.04;
	
	if ((h > (f_edge.y - wfac * dfac)) || (h < wfac * dfac) || (y_f < wfac * dfac * 2.0) || (y_f > (3.0 - wfac * dfac * 2.0))) {
		gl_FragColor = vec4 (0.4, 0.4, 0.4, 1.0);
	}
	if ((h > (f_edge.y - wfac * dfac * 0.5)) || (h < wfac * dfac * 0.5) || (y_f < wfac * dfac) || (y_f > 3.0 - wfac * dfac)) {
		gl_FragColor = vec4 (0.0, 0.0, 0.0, 1.0);
	}
	gl_FragColor *= vec4 (phong (), 1.0);
	
}
