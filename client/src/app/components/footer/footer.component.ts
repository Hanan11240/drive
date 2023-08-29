import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from 'src/app/utils/Services/utils.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  showFooter!:boolean
  constructor(private utilsService:UtilService){}
  ngOnInit(): void {
    this.utilsService.showNavBar$.subscribe({
      next:(value:boolean)=>{
        this.showFooter = value
      }
    })
      }

}
