import { Component, Injector, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const configKey = makeStateKey('CONFIG');
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title : string;
  @ViewChild('gSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler;
  constructor(
    private injector: Injector,
    private state : TransferState,
    @Inject(PLATFORM_ID) private platformid: Object,
    private renderer: Renderer2
  ){
    this.title = 'Voice Search Demo';
    if(isPlatformServer(this.platformid)){
      const envJson = this.injector.get('CONFIG')? this.injector.get('CONFIG'): {};
      this.state.set(configKey, envJson as any);
  }
}


public voiceSearch(){
  if('webkitSpeechRecognition' in window){
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      const voiceSearchForm = this.formSearch.nativeElement;
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      console.log(voiceSearchForm);
      vSearch.onresult = function(e){
        console.log(voiceSearchForm);
        voiceHandler.value = e.results[0][0].transcript;
          vSearch.stop();
          console.log(voiceHandler);
          voiceSearchForm.submit();
      }

      vSearch.onerror = function(e){
          console.log(e);
          vSearch.stop();
      }
  } else {
    console.log(this.state.get(configKey, undefined as any));
    }
}
}

