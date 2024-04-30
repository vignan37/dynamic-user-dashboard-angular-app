import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { UserDetailsService } from '../services/user-details.service';
import { UserDetails } from '../models/user-details.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  userDetails !: UserDetails;
  snackBarRef: any;

  constructor(private searchService: SearchService, private userDetailsService : UserDetailsService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.searchTheUserDetails(searchTerm);
      console.log("insidengoint"+ searchTerm);
    });
  }

  searchTheUserDetails(searchTerm:string){
    console.log(searchTerm);
    this.userDetailsService.fetchUserDetails(searchTerm).subscribe((response) =>{
      this.userDetails = response.data;
      if (this.snackBarRef) {
        //to remove banner if entered a valid id
        this.snackBarRef.dismiss();
      }
      console.log(this.userDetails);
    },
    (error) => {
      this.showErrorMessage('User ID Does not Exist');
    })
  }

  showErrorMessage(message: string) {
    this.snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
    this.snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(() => {
        this.snackBarRef.dismiss();
      });
  }

}
