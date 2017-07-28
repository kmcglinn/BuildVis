attribute vec2 vp;
varying vec2 st;

void main () {
	// work out texture coordinates from vertex position i.e. convert range from -1:1 to 0:1 
	st = (vp + 1.0) * 0.5;
	gl_Position = vec4 (vp, 0.0, 1.0);
}
