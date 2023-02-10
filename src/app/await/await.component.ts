import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-await',
  templateUrl: './await.component.html',
  styleUrls: ['./await.component.scss'],
})
export class AwaitComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('menu');
      }, 1000);
  }

}
