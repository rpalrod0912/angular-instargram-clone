import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class GeneralService implements OnInit {
  ngOnInit(): void {}
  constructor(
    private readonly httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  decodeBase64Image(imageString: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + imageString
    );
  }
}
