import { Component } from '@angular/core';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jsonpost';


  users:      Array<any> = [];
  year:       string;
  found:      boolean;
  novoAno:    Array<any> = [];
  ano:        number = null;
  bissexto:   string;
  proximoAno: number;
  erro:       boolean;
  erro2:      boolean;
  erroMessage:string;
  teste2:     Array<any> = [];
  anoInt:     number

  constructor(private service: UserService, private httpClient:HttpClient){
    this.service.getUsers()
      .subscribe((data) =>{
        this.users = data
        console.log(this.users);
      })
  }

  onNameKeyUp(event:any){
    this.year = event.target.value;
    this.found = true;   
    this.anoInt = Number(this.year)
  }

  Validator(){
      //RESOLVENDO PROBLEMA COM ANO > 19 CARACTERES
      if (this.year.length > 19){
        this.erro = true
      }else if (this.anoInt == 0){
        this.erro2 = true
      }else{
        this.erro = false
        this.erro2 = false
      }

      if (this.erro == true){
        this.erroMessage = "Erro: Ano muito longo digite um ano menor"
        this.ano = null
      }else if (this.erro2 == true) {
        this.erroMessage = "Ano zero não aceito digite outro ano"
        this.ano = null
      }else{

        this.postProfile()
        this.erroMessage = null
        this.getAno()
      }
  }

  postProfile(){
    
    this.httpClient.post(`http://app-ano-bissexto-anobissexto.paulo-dev-apps.gncloud.nz`, {ano:this.anoInt})
    .subscribe(
      (data:any)=>{
        console.log(data)
      }      
    )
  }

  getAno(){
    this.httpClient.get(`http://app-ano-bissexto-anobissexto.paulo-dev-apps.gncloud.nz/`+this.anoInt)
    .subscribe(
      (data:any[])=>{
        
          this.novoAno = data
          console.log(data)

          this.ano = this.novoAno['ano']

          if(this.ano == 0){
            console.log("Erro data = ", this.ano, " tentando novamente")
            this.getAno()
          }else{

          if(this.novoAno['bissexto'] == true){
            this.bissexto = "É um ano bissexto"
          }else{
            this.bissexto = "Não é um ano bissexto"
          }
          this.proximoAno = this.novoAno['proximoano']

        //ATUALIZANDO TABELA
        this.service.getUsers()
        .subscribe((data) =>{
          this.users = data
          console.log(this.users);
        })
        }
      }
    )
  }




  
}


