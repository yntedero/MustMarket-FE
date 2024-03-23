import { Component } from '@angular/core';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { HomeProductCardComponent } from './home-product-card/home-product-card.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { upratovacky } from '../../Data/ecommerce-products-data-master/Men/men_jeans';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarouselComponent, ProductSliderComponent, HomeProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // products:any;
  upratovacky:any;
  ngOnInit(){
    this.upratovacky=upratovacky.slice(0,5);
  }

}
