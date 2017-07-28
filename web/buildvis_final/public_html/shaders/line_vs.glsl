attribute vec2 vp;
uniform vec2 pos;
uniform float length;
uniform float width;
uniform float angle;

void main () {
	mat2 R = mat2 (
		cos (angle), -sin (angle),
		sin (angle), cos (angle)
	);
	vec2 p = vp.xy;
	p.x *= width;
	p.y *= length;
	p = R * p;
	p += pos;
	gl_Position = vec4 (p, 0.0, 1.0);
}
