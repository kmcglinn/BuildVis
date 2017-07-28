precision mediump float;

varying vec2 st;
uniform sampler2D scene_tex;
uniform float width;
uniform float height;

void main () {
	// pixel distances in texture coordinates
	float off_s = 1.0 / width;
	float off_t = 1.0 / height;
/*		
	// basic filter mask (Sobel is 1d more than this)
	vec4 L_s = -0.5 * texture2D (scene_tex, vec2 (st.s - off_s, st.t)) + 0.5 * texture2D (scene_tex, vec2 (st.s + off_s, st.t));
	vec4 L_t = -0.5 * texture2D (scene_tex, vec2 (st.s, st.t - off_t)) + 0.5 * texture2D (scene_tex, vec2 (st.s, st.t + off_t));
	// lazy conversion from colour to greyscale
	float fL_s = (L_s.x + L_s.y + L_s.z) / 3.0;
	float fL_t = (L_t.x + L_t.y + L_t.z) / 3.0;
	float abs_delta_L = sqrt (fL_s * fL_s + fL_t * fL_t);
	if (abs_delta_L > 0.25) {
		gl_FragColor = vec4 (0.0, 0.0, 0.0, 1.0);
		return;
	}
	vec4 texel = texture2D (scene_tex, st);
	gl_FragColor = texel;
*/

	// gaussian filter
	vec3 sum = vec3 (0.0, 0.0, 0.0);

	//if (st.t > 0.75 || st.t < 0.25) {
//		if (st.t > 0.975 || st.t < 0.125) {
	/* LINEAR BLUR
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t + 2.0 * off_t)).rgb * 0.01;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t + 2.0 * off_t)).rgb * 0.02;
			sum += texture2D (scene_tex, vec2 (st.s, st.t + 2.0 * off_t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t + 2.0 * off_t)).rgb * 0.02;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t + 2.0 * off_t)).rgb * 0.01;
		
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t + off_t)).rgb * 0.02;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t + off_t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s, st.t + off_t)).rgb * 0.08;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t + off_t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t + off_t)).rgb * 0.02;
			
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t)).rgb * 0.08;
			sum += texture2D (scene_tex, vec2 (st.s, st.t)).xyz * 0.16;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t)).xyz * 0.08;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t)).xyz * 0.04;
			
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t - off_t)).rgb * 0.02;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t - off_t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s, st.t - off_t)).rgb * 0.08;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t - off_t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t - off_t)).rgb * 0.02;
			
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t - 2.0 * off_t)).rgb * 0.01;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t - 2.0 * off_t)).rgb * 0.02;
			sum += texture2D (scene_tex, vec2 (st.s, st.t - 2.0 * off_t)).rgb * 0.04;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t - 2.0 * off_t)).rgb * 0.02;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t - 2.0 * off_t)).rgb * 0.01;*/
			
		// GAUSSIAN BLUR
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t + 2.0 * off_t)).rgb * 0.00048;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t + 2.0 * off_t)).rgb * 0.005;
			sum += texture2D (scene_tex, vec2 (st.s, st.t + 2.0 * off_t)).rgb * 0.011;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t + 2.0 * off_t)).rgb * 0.005;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t + 2.0 * off_t)).rgb * 0.00048;
		
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t + off_t)).rgb * 0.005;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t + off_t)).rgb * 0.052;
			sum += texture2D (scene_tex, vec2 (st.s, st.t + off_t)).rgb * 0.11;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t + off_t)).rgb * 0.052;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t + off_t)).rgb  * 0.005;
			
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t)).rgb * 0.011;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t)).rgb * 0.11;
			sum += texture2D (scene_tex, vec2 (st.s, st.t)).xyz * 0.25;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t)).xyz * 0.11;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t)).xyz * 0.011;
			
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t - off_t)).rgb * 0.005;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t - off_t)).rgb * 0.052;
			sum += texture2D (scene_tex, vec2 (st.s, st.t - off_t)).rgb * 0.11;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t - off_t)).rgb * 0.052;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t - off_t)).rgb * 0.005;
			
			sum += texture2D (scene_tex, vec2 (st.s - 2.0 * off_s, st.t - 2.0 * off_t)).rgb * 0.00048;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t - 2.0 * off_t)).rgb * 0.005;
			sum += texture2D (scene_tex, vec2 (st.s, st.t - 2.0 * off_t)).rgb * 0.011;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t - 2.0 * off_t)).rgb * 0.005;
			sum += texture2D (scene_tex, vec2 (st.s + 2.0 * off_s, st.t - 2.0 * off_t)).rgb * 0.00048;
			
			
	/*	} else {
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t + off_t)).rgb * 1.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s, st.t + off_t)).rgb * 2.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t + off_t)).rgb * 1.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t)).rgb * 2.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s, st.t)).xyz * 4.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t)).xyz * 2.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s - off_s, st.t - off_t)).rgb * 1.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s, st.t - off_t)).rgb * 2.0 / 16.0;
			sum += texture2D (scene_tex, vec2 (st.s + off_s, st.t - off_t)).rgb * 1.0 / 16.0;
		}*/
		gl_FragColor = vec4 (sum, 1.0) * 1.05;
	/*} else {
		gl_FragColor = texture2D (scene_tex, st);
	}*/
}
