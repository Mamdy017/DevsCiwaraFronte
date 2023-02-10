import { Component } from '@angular/core';
import { AfficherService } from '../Services/afficher.service';
import Swiper from 'swiper';
@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage {
  constructor( private serviceAfficher:AfficherService) { }

  challenge:any;
  
  ngOnInit() {

    const swiper = new Swiper('.slide-content', {
      slidesPerView: 4,
      spaceBetween: 25,
      loop: true,
      centeredSlides: true,
      fadeEffect: {
        crossFade: true
      },
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        520: {
          slidesPerView: 2
        },
        950: {
          slidesPerView: 3
        }
      }
    });



    this.serviceAfficher.afficherChallengeDecroissant().subscribe(data => {
      this.challenge = data;
      this.challenge = this.challenge.slice(0,4);
    });
  }
  options = {
    SlidesPerView: 4,
    centeredSlider: true,
    spaceBetween: 10,
    autoplay: {
      delay: 5000,
    },
  }
  
}
