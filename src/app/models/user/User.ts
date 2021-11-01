import { Byte } from "@angular/compiler/src/util";

export interface User{
    userss_id:number
    firstname:string
    lastname:string
    email:string
    password_hash:Byte[]
    password_salt:Byte[]
    status:boolean
}