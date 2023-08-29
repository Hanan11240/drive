import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UtilService } from 'src/app/utils/Services/utils.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showHeader!:boolean;
constructor(private utilsService:UtilService){}
  ngOnInit(): void {
    this.utilsService.showNavBar$.subscribe({
      next:(value:boolean)=>{
        console.log(value)
        this.showHeader = value
      }
    })
      }

}
