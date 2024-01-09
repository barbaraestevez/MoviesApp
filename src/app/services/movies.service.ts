import { Injectable } from '@angular/core';
import * as Realm from "realm-web";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  user:any;
  constructor() { }
  
  async initMongoConnection(){
    const app = new Realm.App({id:"application-0-vxxea"})
    //const credentials = Realm.Credentials.anonymous();
    const credentials = Realm.Credentials.emailPassword("barbara.estevez@gmail.com", "Admin.1234");
    //console.log(app);
    //console.log(credentials);
    return await app.logIn(credentials);
  }

  async getAllMovies() {
    if (!this.user) {
      this.user = await this.initMongoConnection();
    } 
    return await this.user.functions.getAllMovies();
  }

  async getMovieById(arg:string) {
    if (!this.user) {
      this.user = await this.initMongoConnection();
    } 
    return await this.user.functions.getMovieById(arg);
  }

}
