// create a new virtual camera object
function Camera (fov_deg, aspect, nearClip, farClip, wc_pos, direction) {
	this.mFOV_deg = fov_deg;
	this.mAspect = aspect;
	this.mNearClip = nearClip;
	this.mFarClip = farClip;
	this.mWC_Pos = wc_pos;
	this.mDirection = direction;
	this.mCurrentYaw_deg = 0;
	this.mCurrentPitch_deg = 0;
	// vec3 is a bit unnatural and doesn't like to be mixed some im using arrays explicitly
	var targ = [0, 0, 0];
	targ[0] = wc_pos[0] + direction[0];
	targ[1] = wc_pos[1] + direction[1];
	targ[2] = wc_pos[2] + direction[2];
	/* ISOMETRIC CAM */
	this.mViewMat = look_at (wc_pos, targ, [0, 2, -1]);
	/* BIRDS EYE CAM */
	//this.mViewMat = look_at (this.mWC_Pos, [wc_pos[0], wc_pos[1] - 1, wc_pos[2]], [0, 0, -1]);
	this.mProjMat = perspective (this.mFOV_deg, this.mAspect, this.mNearClip, this.mFarClip);
	
	this.setPos = function (wc_pos) {
		this.mWC_Pos = wc_pos;
		var targ = [0, 0, 0];
		targ[0] = wc_pos[0] + this.mDirection[0];
		targ[1] = wc_pos[1] + this.mDirection[1];
		targ[2] = wc_pos[2] + this.mDirection[2];
		/* ISOMETRIC CAM */
		this.mViewMat = look_at (this.mWC_Pos, targ, [0, 2, -1]);
		/* BIRDS EYE CAM */
		//this.mViewMat = look_at (this.mWC_Pos, [wc_pos[0], wc_pos[1] - 1, wc_pos[2]], [0, 0, -1]);
	}
	
	this.moveBy = function (wc_dist) {
		var pos = [0, 0, 0];
		pos[0] = wc_dist[0] + this.mWC_Pos[0];
		pos[1] = wc_dist[1] + this.mWC_Pos[1];
		pos[2] = wc_dist[2] + this.mWC_Pos[2];
		//alert("new pos: " + pos[0] + ", " + pos[1] + ", " + pos[2])
		
		this.setPos (pos);
	}
	
	this.moveInCamDirBy = function (wc_dist) {
		var pos = [0, 0, 0];
		pos[0] = wc_dist * this.mDirection[0] + this.mWC_Pos[0];
		pos[1] = wc_dist * this.mDirection[1] + this.mWC_Pos[1];
		pos[2] = wc_dist * this.mDirection[2] + this.mWC_Pos[2];
		//alert("new pos: " + pos[0] + ", " + pos[1] + ", " + pos[2])
		
		this.setPos (pos);
	}
	
	this.slideCamBy = function (wc_dist) {
		var sideVec = cross_vec3 (this.mDirection, [0, 1, 0]); // NOTE didn't work in var v = cross (1,2) format
		var pos = [0, 0, 0];
		pos[0] = wc_dist * sideVec[0] + this.mWC_Pos[0];
		pos[1] = wc_dist * sideVec[1] + this.mWC_Pos[1];
		pos[2] = wc_dist * sideVec[2] + this.mWC_Pos[2];
		//alert("slide dir = " + sideVec[0] + " " + sideVec[1] + " " + sideVec[2]);
		//alert("new pos: " + pos[0] + ", " + pos[1] + ", " + pos[2])
		
		this.setPos (pos);
	}
	
	this.deltaYaw = function (yaw) {
		var yawmat = rotate_y_deg (mat4.identity (), -yaw); // oppose mouse direction with -ve yaw
		this.mDirection = mult_mat4_vec3 (yawmat, this.mDirection);
		this.setPos (this.mWC_Pos);
	}
}
