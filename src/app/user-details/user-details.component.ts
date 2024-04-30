import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../models/user-details.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetailsService } from '../services/user-details.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  userId!: number ;
  userDetails!: UserDetails;
  snackBarRef: any;

  constructor(private route: ActivatedRoute, private userDetailsService: UserDetailsService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userIdParam = params['id'];
      this.userId =  typeof userIdParam === 'string' ? +userIdParam : userIdParam; 
    });
    console.log(this.userId + "this is user id");
    this.getUserDetails(this.userId.toString());
  }

  getUserDetails(userId: string) {
    this.userDetailsService.fetchUserDetails(userId).subscribe(
      (response) => {
        
        this.userDetails = response.data;
        console.log(this.userDetails);
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.showErrorMessage('Failed to fetch user details');
      }
    );
  }
  showErrorMessage(message: string) {
    this.snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 0,
    });
    this.snackBarRef.onAction().pipe(take(1)).subscribe(() => {
      this.snackBarRef.dismiss();
    });
  }

  goBackToDashboard(){
    this.router.navigate(['/users']);
  }

}
