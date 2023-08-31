import { Vector3 } from "./Vector3";

export class Vector4 extends Vector3 {
    w: number;

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0){
		super(x, y, z);
        this.w = w;
	}

	override normalize(){
		var length = this.length();
        this.w /= length;
		this.x /= length;
		this.y /= length;
		this.z /= length;
	}
	
	override length(){
		return Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z);
	}
}