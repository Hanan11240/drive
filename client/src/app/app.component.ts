import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';



@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  title = 'Ride-Kashmir';
}
