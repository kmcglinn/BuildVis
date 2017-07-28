precision mediump float;

varying vec2 st;
uniform sampler2D depth_tex;

void main () {
	gl_FragColor = texture2D (depth_tex, st);
}
