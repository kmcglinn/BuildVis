precision mediump float;

varying vec2 st;

uniform sampler2D tex;

void main () {
	gl_FragColor = texture2D (tex, vec2 (st.s, 1.0 - st.t));
	gl_FragColor.a *= 0.5;
}
