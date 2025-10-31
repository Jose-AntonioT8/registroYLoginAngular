import { Injectable, signal } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';

export interface StrapiUser{
    id : number
    documentId: string
    username : string
    name : string
    surname : string
    email:string
    provider : string
    confirmed : string 
    bolcked : boolean
    createdAt : string 
    updateAt:string 
    publishedAt:string 


}


@Injectable({
  providedIn: 'root'
})
export class strapiAuthService {
private http:HttpClient=inject(HttpClient);
  public error:any|null;
  public user:any|null;
  private token : string|null;

  constructor() { 
    this.user = signal<any>(null);
    this.error = signal<any>(null);
    const token = localStorage.getItem('token');
    if(token){

    }
  }

  me():User|null{
    if(token){
        this.http.get<StrapiUser>("http://localhost:1337/api/user/me", {
            headers:{
                'Authorization':'Bearer ${this.token}'
            }
        }).subscribe{{
            next:(data)=>{
                const user = {
                    name : data.name,
                    surname : data.surname,
                    email : data.email
                }
            },
            error:(err)=>{}
        }}
    }else
    return null;
   
  }

  setUser(user:User){
    this.user.set(user);
  }

  login(credentials:Credentials){

    const body ={
        identifier:credentials.email,
        password:credentials.password
    };
    this.http.post<LoginResponse>("http://localhost:1337/api/auth/local", body).
    next:(data)=>{
        localStorage.setItem('token', data.jwt);
        const newUser:User={
            email:data.user.email,
            name:data.user.name,
        }
        this.user.set()
    }
  }

  logout(){
    localStorage.removeItem('AUTHENTICATION');
    this.user.set(null);
  }

}
