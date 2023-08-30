import { Quaternion } from "./Quaternion.js";

export class Vec3f {
	x: number;
	y: number;
	z: number;

	constructor(x = 0, y = 0, z = 0){
		this.x = x;
		this.y = y;
		this.z = z;
	}

	integerize(){
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		return this;
	}
	
	equals(VectorA) {
		this.x = VectorA.x;
		this.y = VectorA.y;
		this.z = VectorA.z;
	}
	
	addAssign(VectorA){
		this.x += VectorA.x;
		this.y += VectorA.y;
		this.z += VectorA.z;
	}
	
	add(VectorA){
		return(new Vec3f(this.x+VectorA.x, this.y+VectorA.y, this.z+VectorA.z));
	}
	
	subAssign(VectorA){
		this.x -= VectorA.x;
		this.y -= VectorA.y;
		this.z -= VectorA.z;
	}
	
	sub(VectorA){
		return(new Vec3f(this.x-VectorA.x, this.y-VectorA.y, this.z-VectorA.z));
	}
	
	scaleAssign(Scalar){
		this.x *= Scalar;
		this.y *= Scalar;
		this.z *= Scalar;
		return this;
	}
	
	scale(Scalar){
		return new Vec3f(this.x* Scalar, this.y* Scalar, this.z* Scalar);
	}
	
	dotProduct(VectorA){
		return this.x*VectorA.x + this.y*VectorA.y + this.z*VectorA.z;
	}
	
	crossProduct(VectorA){
		return(new Vec3f(this.y*VectorA.z - this.z*VectorA.y, this.z*VectorA.x - this.x*VectorA.z, this.x*VectorA.y - this.y*VectorA.x));
	}
	
	normalize(){
		var length = this.length();
		this.x /= length;
		this.y /= length;
		this.z /= length;
	}
	
	length(){
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}
	
	rotate(angleRads, axis){
		if(angleRads != 0){	
			axis.direction.normalize();
			this.x -= axis.position.x;
			this.y -= axis.position.y;
			this.z -= axis.position.z;
			var sinAngle = Math.sin(angleRads/2);
			var Q = new Quaternion(Math.cos(angleRads/2), sinAngle*axis.direction.x, sinAngle*axis.direction.y, sinAngle*axis.direction.z);
			var Qconj = Q.Qconjugate();
			Q.Vmul(this);
			Q.Qmul(Qconj);
			this.x = Q.x;
			this.y = Q.y;
			this.z = Q.z;
			this.x += axis.position.x;
			this.y += axis.position.y;
			this.z += axis.position.z;
		}
		return this;
	}

	rotate_origin(angleRads, v){
		// Rotate about a vector pointing from the origin
		if(angleRads != 0){	
			v.normalize();
			var sinAngle = Math.sin(angleRads/2);
			var Q = new Quaternion(Math.cos(angleRads/2), sinAngle*v.x, sinAngle*v.y, sinAngle*v.z);
			var Qconj = Q.Qconjugate();
			Q.Vmul(this);
			Q.Qmul(Qconj);
			this.x = Q.x;
			this.y = Q.y;
			this.z = Q.z;
		}
		return this;
	}

	// matMul(m) {
	// 	let v = new Vec3f(0, 0, 0);
	// 	v.x = i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + i.w * m.m[3][0];
	// 	v.y = i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + i.w * m.m[3][1];
	// 	v.z = i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + i.w * m.m[3][2];
	// 	return v;
	// }

	// matMulAssign(m) {
	// 	this.x = i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + i.w * m.m[3][0];
	// 	this.y = i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + i.w * m.m[3][1];
	// 	this.z = i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + i.w * m.m[3][2];
	// }
}