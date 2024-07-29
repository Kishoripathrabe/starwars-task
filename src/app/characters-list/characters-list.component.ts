import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, from, map } from 'rxjs';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'height', 'mass', 'birth_year', 'actions','favorites'];
  people = [];
  totalPeople = 0;
  pageSize = 10;
  currentPage = 0;
  value = "";
  searchControl: FormControl = new FormControl();
  @ViewChild('paginator') paginator: MatPaginator | undefined;

  constructor(private apiService: ApiService,  private router: Router) {
  }

  searchByName(value: any) {
    this.value = value;
    this.loadPeople(1,this.value);
    this.currentPage = 0;
    this.paginator?this.paginator.firstPage():false;
    }  

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000), 
      distinctUntilChanged() 
    ).subscribe((value: any) => {
      this.searchByName(value);
    });
    this.loadPeople();
  }

  loadPeople(page: number = 1,sQuery=''): void {
    this.apiService.getData('people',`page=${page}&search=${sQuery}`).subscribe((res: any) => {
      this.people = res?.results?.map((person: any) => {
        let pid = this.getPid(person);
        person['isFavorite'] = from(this.apiService.getFavorite(pid));
        return person;
      })
      this.totalPeople = res.count;
    })
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.loadPeople(this.currentPage + 1,this.value);
  }

  viewDetails(person: any): void {
    this.router.navigate(['/person', this.getPid(person)]);
  }

  toggleFavorite( person: any) {
    let pid = this.getPid(person);
    person['isFavorite'] = this.apiService.toggleFavorite(pid);
    console.log("favourite", person);
  }

  getPid(person:any){
    return person.url.split('/').filter(Boolean).pop();
  }

}
