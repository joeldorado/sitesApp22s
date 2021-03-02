import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() public blockPosition: any;
  @Input() public videoSettings: any;
  width!: number;
  height!: number;
  constructor() { }

  ngOnInit(): void {
    console.log('columns type: ' , this.videoSettings);
     // Este código carga el reproductor de la API en un iframe de manera asíncrona, siguiendo las instrucciones:
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    if (this.videoSettings === 1) {
      this.width = 1000;
      this.height = 500;
    } else if (this.videoSettings === 2) {
      this.width = 500;
      this.height = 300;
    } else if (this.videoSettings === 3) {
      this.width = 250;
      this.height = 100;
    }
  }

}
