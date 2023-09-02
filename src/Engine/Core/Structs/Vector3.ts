export class Vector3 {
	x: number;
	y: number;
	z: number;

	constructor(x: number = 0, y: number = 0, z: number = 0){
		this.x = x;
		this.y = y;
		this.z = z;
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
}