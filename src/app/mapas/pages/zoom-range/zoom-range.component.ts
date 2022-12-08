import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10
  center: [number, number] = [-67.03201136408785, 10.600235811602637]


  constructor() { }


  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { })
    this.mapa.off('zoomend', () => { })
    this.mapa.off('move', () => { })
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 15
    });

    // manejos del zoom
    this.mapa.on('zoom', (e) => {
      this.zoomLevel = this.mapa.getZoom()
    })


    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    })

    // Obtener coordenadas por el movimiento del mapa
    this.mapa.on('move', (e) => {
      const target = e.target
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat]
    })

  }


  zoom(valor: string) {
    if (valor === '-') {
      this.mapa.zoomOut();
    } else {
      this.mapa.zoomIn()
    }
  }


  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor))
  }

}
