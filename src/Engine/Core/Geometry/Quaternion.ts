import { Vector4 } from "../Structs/Vector4.js";

export class Quaternion extends Vector4 {
	w: number;
	x: number;
	y: number;
	z: number;

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1){
		super(x, y, z, w)
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
	Qconjugate(){
		return(new Quaternion(this.w,-this.x,-this.y,-this.z));
	}
}
