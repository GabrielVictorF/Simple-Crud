import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/common/http';
import { Item } from '../../models/item';
import { Usuario } from '../../models/usuario';

@Injectable()
export class ApiProvider {
  private APP_ID: string;
  private API_KEY: string;
  private URL: string;
  private REST_API: string;
  public sessao: any;

  constructor(public http: HttpClient) {
    this.APP_ID = 'D1EADC75-4507-6B25-FFB7-77CF054A3100';
    this.API_KEY = '906E8089-90DF-787A-FFA4-21D2B9008200';
    this.URL = 'https://api.backendless.com';
    this.REST_API = this.URL + '/' + this.APP_ID  + '/' + this.API_KEY;
  }

  getFavoritos() {
    const url: string = this.REST_API + '/data/favoritos?pageSize=25';
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    return this.http.get<Item>(url, httpOptions);
  }

  public login(email: string, password: string): any {
    const url = this.REST_API + '/users/login';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    let body = {
    	login: email,
    	password: password
    }
  	return this.http.post<Usuario>(url,
  		body, httpOptions);
	}

  public adicionarItem(item) {
    const url = this.REST_API + '/data/favoritos';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
    	nome: item.nome,
      quantidade: item.quantidade
    }
  	return this.http.post<Item>(url,
  		body, httpOptions);
	}

  public editaItem(item: Item) {
    var url = this.REST_API + '/data/favoritos/' + item.objectId;
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
      nome: item.nome,
      quantidade: parseInt(item.quantidade)
    };
    return this.http.put<Item>(url, body, httpOptions);
  }

  public deleta(id: string, dir: string): any {
    const url = this.REST_API + '/data/' + dir + '/' + id;
    return this.http.delete(url);
  }

  public cadastra(user):any {
    const url = this.REST_API + '/users/register';
   const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
  let body = {
    email: user.email,
    password: user.password,
    name: user.nome,
    idade: user.idade
  }

  return this.http.post<Usuario>(url, body, httpOptions);
  }

  // public resetSenha(email): any {
  //   const where = "?where=email%3D'" + email + "'";
  //   const urlBuscaUser = this.REST_API + '/data/users' + where;
  //   console.log(urlBuscaUser);
  //   const urlResetSenha = this.REST_API + '/users/restorepassword/';

  //   this.http.get(urlBuscaUser).subscribe(res => {
  //     const id = res.objectId;
  //     return this.http.get(urlResetSenha + id);
  //   });  
  // }

  public infoUser(userId?) {
    let url: string;
    if (userId) {
      url = this.REST_API + '/users/' + userId;
    } else {
      url = this.REST_API + '/data/Users';
    }
    
    return this.http.get(url);
  }

  public editaUser(user: Usuario) {
    const url = this.REST_API + '/data/Users/' + user.ownerId;
    console.log(user.nivel);
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
      email: user.email,
      nome: user.name,
      idade: parseInt(user.idade),
      nivel: parseInt(user.nivel)
    }
    return this.http.put<Usuario>(url, body, httpOptions);
  }

  public logout() {
    const url = this.REST_API + '/users/logout';
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    
    return this.http.get(url, httpOptions);
  }

  public validaToken() {
    const url = this.REST_API + '/users/isvalidusertoken/' + localStorage.userToken;
    return this.http.get(url);
  }
}
