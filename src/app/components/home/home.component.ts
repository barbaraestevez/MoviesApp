import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="showData()">Mostrar películas</button>
    <ul *ngFor="let mov of movies">
     <li>{{mov.title}}</li> 
    </ul>
    
    <input type="text" placeholder="Inserte el Id de la película aquí" #movieId>
    <button (click)="findMovieById(movieId.value)">Mostrar película por Id</button>
    <p *ngIf="currentMovie">{{currentMovie.title}}</p>
    
  `,
  styles: [
    `
  `
  ]
})
export class HomeComponent {
  movies:any;
  currentMovie:any;
 

  constructor(private _mov:MoviesService, private cdr:ChangeDetectorRef){}
  
  showData() {
    this._mov.getAllMovies()
    .then(movies => {
      this.movies = movies.result;
      this.cdr.detectChanges();
      //console.log(movies);
    }) 
  }
  findMovieById(movieId:string){
    console.log(movieId);
    this._mov.getMovieById(movieId).then (data => {
      if(data.result) { 
        this.currentMovie = data.result;
      } else {
        alert(data.error);
        
      }
    })
    
  }
}
