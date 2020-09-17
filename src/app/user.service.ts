import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Uri :string = "http://app-ano-bissexto-anobissexto.paulo-dev-apps.gncloud.nz/"

  public selectUser = null;
  public nextUserId = null;


  constructor(private http: HttpClient) {
    this.getUsers()
    .subscribe((data) =>{
      this.nextUserId = (data[data.length - 1].ano+1)
      console.log("proximo ano disponivel "+this.nextUserId)
    })
  }

    public getUsers(){
    return this.http.get<Array<any>>(this.Uri);
   }

   public getAnoId(){
    return this.http.get<Array<any>>(this.Uri);
   }

   postUser(){
    return this.http.post(this.Uri,  { ano:2001, })
    
  }
   
}
