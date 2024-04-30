import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ FormsModule,MatIconModule, MatInputModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dashboardTitle = 'Dynamic User Dashboard';
  searchTerm : string = '';

  constructor(private searchService: SearchService, private router: Router) {
  }
  
  searchUsers(){
    this.searchService.setSearchTerm(this.searchTerm);
    this.navigateToDashboard();
  }

  navigateToDashboard(){
    this.router.navigate(['/users']);
  }
}
