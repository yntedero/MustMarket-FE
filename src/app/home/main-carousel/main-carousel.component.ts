import { Component } from '@angular/core';
import { homeCarouselData } from '../../../Data/ecommerce-products-data-master/mainCarousel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [
    // RouterModule.forRoot([])
    CommonModule
  ],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.scss'
})
export class MainCarouselComponent {
  carouselData:any;
  currentSlide=0;

  ngOnInit(){
    this.carouselData=homeCarouselData;
    console.log(this.carouselData);
  }

  autoPlay(){
    setInterval(()=>{
      this.nextSlide();
    },2000)
  }
  nextSlide(){
    this.currentSlide=(this.currentSlide+1) %this.carouselData.len;
  }
}
