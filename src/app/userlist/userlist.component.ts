import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { UserDetailsService } from '../services/user-details.service';
import { UserDetails } from '../models/user-details.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule , MatPaginatorModule, MatCardModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent {
  userDetails !: UserDetails;
  snackBarRef: any;
  totalUsers =10 ; 
  pageSize = 6;
  users !: UserDetails [];

  constructor(private searchService: SearchService, private userDetailsService : UserDetailsService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.searchTheUserDetails(searchTerm);
      console.log("insidengoint"+ searchTerm);
    });
    this.getAllUsersData(1);
  }

  getAllUsersData(pageNumber : number){
    this.userDetailsService.fetchAllUserDetails(pageNumber).subscribe(
      (users: any) => {
        this.users = users.data;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
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

  onPageChange(event: any) {
    //this.pageNumber = event.pageIndex + 1;
    this.getAllUsersData(event.pageIndex + 1);
  }

}
