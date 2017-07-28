var g_canvas = document.getElementById ("canvas_id");
var gl = null;

function throwOnGLError (err, funcName, args) {
  console.error (
		WebGLDebugUtils.glEnumToString (err) + " was caused by call to: " + funcName
	);
}

function init_gl () {
	gl = WebGLUtils.setupWebGL (g_canvas);
	if (!gl) {
		console.error ("could not get webgl context");
	}
//	gl = WebGLDebugUtils.makeDebugContext (gl, throwOnGLError);
}

function get_string_from_URL (url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open ("GET", url, false);
  xmlhttp.send ();
  return xmlhttp.responseText;
}

function load_shaders_from_strings (vs_str, fs_str) {
  var vs = gl.createShader (gl.VERTEX_SHADER);
  var fs = gl.createShader (gl.FRAGMENT_SHADER);
  gl.shaderSource (vs, vs_str);
  gl.shaderSource (fs, fs_str);
  gl.compileShader (vs);
  gl.compileShader (fs);
  var sp = gl.createProgram ();
  gl.attachShader (sp, vs);
  gl.attachShader (sp, fs);
  gl.linkProgram (sp);
  return sp;
}

function load_shaders_from_files (vs_filename, fs_filename) {
	var vs_str = get_string_from_URL (vs_filename);
	var fs_str = get_string_from_URL (fs_filename);
	var sp = load_shaders_from_strings (vs_str, fs_str);
	return sp;
}

function get_uniform_loc (sp, var_str) {
	var loc = gl.getUniformLocation (sp, var_str);
	if (loc < 0) {
		console.error ("uniform variable not active: " + var_str);
	}
	return loc;
}
