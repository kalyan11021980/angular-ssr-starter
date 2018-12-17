import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title : string;
  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformid: Object
  ){
    this.title = 'demo';
    if(isPlatformServer(this.platformid)){
      console.log(this.injector.get('CDN_URL'));
    } else {
      console.log('I am in client');
    }
      
  }
}
