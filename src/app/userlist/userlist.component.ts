import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { UserDetailsService } from '../services/user-details.service';
import { UserDetails, UsersData } from '../models/user-details.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule , MatPaginatorModule, MatCardModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent {
  userDetails!: UserDetails;
  snackBarRef: any;
  totalUsers !: number ; 
  pageSize ! : number;
  users !: UserDetails [];
  
  constructor(private searchService: SearchService, private userDetailsService : UserDetailsService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.searchTheUserDetails(searchTerm);
      console.log("insidengoint"+ searchTerm);
    });
    this.getAllUsersData(1);
    console.log("does details exisit"+this.userDetails);
  }

  getAllUsersData(pageNumber : number){
    this.userDetailsService.fetchAllUserDetails(pageNumber).subscribe(
      (users: UsersData) => {
        this.users = users.data;
        this.totalUsers = users.total;
        this.pageSize = users.per_page;
        this.userDetails = {} as UserDetails;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  searchTheUserDetails(searchTerm:string){
    console.log("this " +searchTerm + " search term");
    if(searchTerm.trim() !== ''){
      this.userDetailsService.fetchUserDetails(searchTerm).subscribe((response) =>{
        this.userDetails = response.data;
        //remove all the users
        this.users = [];
        if (this.snackBarRef) {
          //to remove banner if entered a valid id
          this.snackBarRef.dismiss();
        }
        console.log(this.userDetails);
      },
      (error) => {
        this.userDetails = {} as UserDetails;
        this.showErrorMessage('User ID Does not Exist, enter a valid ID');
      })
    }
    else{
      this.getAllUsersData(1);
    }
  }

  showErrorMessage(message: string) {
    this.snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 0,
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
    console.log(event.pageIndex + 1 + "index");
    this.getAllUsersData(event.pageIndex + 1);
  }

  navigateToUserDetails(userId: number){
    this.router.navigate(['/user-details', userId]);
  }

}
