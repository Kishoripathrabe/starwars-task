import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  person: any;
  films: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,private apiService:ApiService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    of({}).pipe(switchMap((value: any) => {
    this.person = value;
    let rarr = value.films.map((filmUrl: any) =>{
        return (this.http.get(filmUrl)); 
      })
        return forkJoin(rarr)
    })).subscribe(res =>{
      this.films = res;
      console.log("this.films : ",this.films);
    })
  }
  
}
