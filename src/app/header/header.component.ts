import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
//import {MatTypographyModule} from '@angular/material/typography';



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

  searchUsers(){
    return 0;
  }
}
