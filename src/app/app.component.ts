import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const configKey = makeStateKey('CONFIG');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title : string;
  constructor(
    private injector: Injector,
    private state : TransferState,
    @Inject(PLATFORM_ID) private platformid: Object
  ){
    this.title = 'demo';
    if(isPlatformServer(this.platformid)){
      const envJson = this.injector.get('CONFIG')? this.injector.get('CONFIG'): {};
      this.state.set(configKey, envJson as any);
    } else {
      console.log(this.state.get(configKey, undefined as any));
    }
      
  }
}
