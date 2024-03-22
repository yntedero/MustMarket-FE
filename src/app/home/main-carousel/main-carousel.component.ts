import { Component } from '@angular/core';
import { homeCarouselData } from '../../../Data/ecommerce-products-data-master/mainCarousel';
@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.scss'
})
export class MainCarouselComponent {
  carouselData:any;
  currentSlide=0;

  ngOnInit(){
    this.carouselData=homeCarouselData;

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
