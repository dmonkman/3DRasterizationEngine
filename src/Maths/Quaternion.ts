export class Quaternion{
	w: number;
	x: number;
	y: number;
	z: number;

	constructor(w=1, x=0, y=0, z=0){
		this.w = w;
		this.x = x;
		this.y = y;
		this.z = z;
	}
	set(theta, v){
		v.scale(Math.sin(theta/2))
		this.w = Math.cos(theta/2)
		this.x = v.x
		this.y = v.y
		this.z = v.z
	}
	normalize(){
		var length = this.length();
		if(length != 1){
			this.w /= length;
			this.x /= length;
			this.y /= length;
			this.z /= length;
		}
	}
	length(){
		return Math.sqrt(this.w+this.w + this.x*this.x + this.y*this.y + this.z*this.z);
	}
	Vmul(VectorA){
		var w_ = - this.x*VectorA.x - this.y*VectorA.y - this.z*VectorA.z;
		var x_ = this.w*VectorA.x + this.y*VectorA.z - this.z*VectorA.y;
		var y_ = this.w*VectorA.y - this.x*VectorA.z + this.z*VectorA.x;
		var z_ = this.w*VectorA.z + this.x*VectorA.y - this.y*VectorA.x;
		this.w = w_;
		this.x = x_;
		this.y = y_;
		this.z = z_;
	}
	Qmul(QuaternionA){
		var w_ = this.w*QuaternionA.w - this.x*QuaternionA.x - this.y*QuaternionA.y - this.z*QuaternionA.z;
		var x_ = this.w*QuaternionA.x + this.x*QuaternionA.w + this.y*QuaternionA.z - this.z*QuaternionA.y;
		var y_ = this.w*QuaternionA.y - this.x*QuaternionA.z + this.y*QuaternionA.w + this.z*QuaternionA.x;
		var z_ = this.w*QuaternionA.z + this.x*QuaternionA.y - this.y*QuaternionA.x + this.z*QuaternionA.w;
		this.w = w_;
		this.x = x_;
		this.y = y_;
		this.z = z_;
	}
	Qconjugate(){
		return(new Quaternion(this.w,-this.x,-this.y,-this.z));
	}
}
