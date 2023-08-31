import { Vector3 } from "../Basic/Vector3";
import { Vector4 } from "../Basic/Vector4";
import { Quaternion } from "./Quaternion";
import { Axis } from "./Axis";

export namespace LinearAlgebra{
    export function Quaternion_Mul_Q(q1: Quaternion, q2: Quaternion): Quaternion{
        var w_ = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
        var x_ = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
        var y_ = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
        var z_ = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w;
        return new Quaternion(w_, x_, y_, z_)
    }

    export function Quaternion_Mul_V(q: Quaternion, v: Vector3): Quaternion{
        var w_ = -q.x*v.x - q.y*v.y - q.z*v.z;
        var x_ = q.w*v.x + q.y*v.z - q.z*v.y;
        var y_ = q.w*v.y - q.x*v.z + q.z*v.x;
        var z_ = q.w*v.z + q.x*v.y - q.y*v.x;
        return new Quaternion(w_, x_, y_, z_)
    }

    export function Quaternion_Mul_Q_V(q1: Quaternion, q2: Quaternion): Vector3{
        //var w_ = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
        var x_ = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
        var y_ = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
        var z_ = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w;
        return new Vector3(x_, y_, z_)
    }

    export function Quaternion_Conjugate(q: Quaternion): Quaternion{
        return(new Quaternion(q.w,-q.x,-q.y,-q.z));
    }

    export function Vector3_Add(v1: Vector3, v2: Vector3)
    {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    export function Vector3_Sub(v1: Vector3, v2: Vector3)
    {
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    export function Vector3_Scale(v1: Vector3, k: number)
    {
        return new Vector3(v1.x * k, v1.y * k, v1.z * k );
    }

    export function Vector3_DotProduct(v1: Vector3, v2: Vector3)
    {
        return v1.x*v2.x + v1.y*v2.y + v1.z * v2.z;
    }

    export function Vector3_Length(v: Vector3)
    {
        return Math.sqrt(Vector3_DotProduct(v, v));
    }

    export function Vector3_Normalize(v: Vector3)
    {
        let l = Vector3_Length(v);
        return new Vector3(v.x / l, v.y / l, v.z / l );
    }

    export function Vector3_CrossProduct(v1, v2)
    {
        let v : Vector3 = new Vector3(0, 0, 0);
        v.x = v1.y * v2.z - v1.z * v2.y;
        v.y = v1.z * v2.x - v1.x * v2.z;
        v.z = v1.x * v2.y - v1.y * v2.x;
        return v;
    }

    export function Vector3_IntersectPlane(plane_p, plane_n, lineStart, lineEnd)
    {
        plane_n = Vector3_Normalize(plane_n);
        let plane_d : number = -Vector3_DotProduct(plane_n, plane_p);
        let ad : number = Vector3_DotProduct(lineStart, plane_n);
        let bd : number = Vector3_DotProduct(lineEnd, plane_n);
        let t : number = (-plane_d - ad) / (bd - ad);
        let lineStartToEnd : Vector3 = Vector3_Sub(lineEnd, lineStart);
        let lineToIntersect : Vector3 = Vector3_Scale(lineStartToEnd, t);
        return Vector3_Add(lineStart, lineToIntersect);
    }

    export function Vector3_Rotate(v: Vector3, angleRadians: number, axis: Axis){
        if(angleRadians != 0){	
            axis.direction.normalize();
            this.x -= axis.position.x;
            this.y -= axis.position.y;
            this.z -= axis.position.z;
            var sinAngle = Math.sin(angleRadians/2);
            var Q = new Quaternion(Math.cos(angleRadians/2), sinAngle*axis.direction.x, sinAngle*axis.direction.y, sinAngle*axis.direction.z);
            var Qconj = Q.Qconjugate();
            Quaternion_Mul_V(Q, v);
            Quaternion_Mul_Q(Q, Qconj);
            this.x = Q.x;
            this.y = Q.y;
            this.z = Q.z;
            this.x += axis.position.x;
            this.y += axis.position.y;
            this.z += axis.position.z;
        }
        return this;
    }

    export function Vector3_RotateAboutOrigin(v: Vector3, angleRadians: number){
        // Rotate about a vector pointing from the origin
        if(angleRadians != 0){	
            v.normalize();
            var sinAngle: number = Math.sin(angleRadians/2);
            var Q = new Quaternion(Math.cos(angleRadians/2), sinAngle*v.x, sinAngle*v.y, sinAngle*v.z);
            var Qconj = Quaternion_Conjugate(Q);
            Quaternion_Mul_V(Q, v);
            Quaternion_Mul_Q(Q, Qconj);
            this.x = Q.x;
            this.y = Q.y;
            this.z = Q.z;
        }
        return this;
    }
}