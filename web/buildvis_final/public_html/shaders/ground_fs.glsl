precision mediump float;

varying vec2 st;
varying vec3 n_eye;

varying vec4 st_shadow;

uniform sampler2D tex;
uniform sampler2D depth_map;

// constant that you can use to slightly tweak the depth comparison
const float epsilon = 0.0;

float eval_shadow (vec2 texcoods) {
	float shadow = texture2D (depth_map, texcoods).r;
	if (shadow + epsilon < st_shadow.z) {
		return 0.4; // shadowed
	}
	return 1.0; // not shadowed
}

void main () {
	float shadow_factor = 0.0;
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0002, 0.0));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (-0.0002, 0.0));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0, 0.0002));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0, -0.0002));
	
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0002, 0.0002));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0002, -0.0002));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (-0.0002, 0.0002));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (-0.0002, -0.0002));
	
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0004, 0.0));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (-0.0004, 0.0));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0, 0.0004));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0, -0.0004));
	
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0004, 0.0004));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (0.0004, -0.0004));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (-0.0004, 0.0004));
	shadow_factor += eval_shadow (st_shadow.xy + vec2 (-0.0004, -0.0004));
	
	shadow_factor /= 16.0;
	
	gl_FragColor = texture2D (tex, vec2 (st.s * 60.0, st.t * 90.0)) * 1.5;
	gl_FragColor.rgb *= shadow_factor;
	gl_FragColor.a = 1.0;
}
