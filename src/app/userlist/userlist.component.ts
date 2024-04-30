import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { UserDetailsService } from '../services/user-details.service';
import { UserDetails } from '../models/user-details.model';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {

  searchTerm: string = '';
  userDetails !: UserDetails;

  constructor(private searchService: SearchService, private userDetailsService : UserDetailsService) {
  }

  ngOnInit() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.searchTheUserDetails(searchTerm);
      console.log("insidengoint"+ searchTerm);
    });
  }

  searchTheUserDetails(searchTerm:string){
    console.log(searchTerm);
    this.userDetailsService.fetchUserDetails(searchTerm).subscribe((response) =>{
      this.userDetails = response.data;
      console.log(this.userDetails);
    })
  }

}
