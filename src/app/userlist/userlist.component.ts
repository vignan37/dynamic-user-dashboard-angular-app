import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {

  searchTerm: string = '';

  constructor(private searchService: SearchService, private userDetailsService : UserDetailsService) {
  }

  ngOnInit() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.searchTheTerm();
    });
  }

  searchTheTerm(){
    console.log(this.searchTerm);
    this.userDetailsService.fetchUserDetails(this.searchTerm);
  }

}
