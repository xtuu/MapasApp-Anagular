import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }


    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10

  constructor() { }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-67.03201136408785, 10.600235811602637],
      zoom: 15
    });

    this.mapa.on('zoom', (e) => {
      this.zoomLevel = this.mapa.getZoom()
    })


  }


  zoom(valor: string) {
    if (valor === '-') {
      this.mapa.zoomOut();
    } else {
      this.mapa.zoomIn()
    }
  }

}
