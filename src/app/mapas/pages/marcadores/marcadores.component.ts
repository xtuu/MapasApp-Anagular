import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


interface MarcadorColor {
  color: string;
  market: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }


    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {


  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-67.03201136408785, 10.600235811602637]


  //Arreglos de marcadores
  marcadores: MarcadorColor[] = []


  constructor() { }


  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 15
    });


    //cambiar la aparencia del marcador - opcional
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'holisss'

    // const market = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa)

  }



  agregarMarcador() {
    //color aleatorio
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)
    this.marcadores.push({
      color,
      market: nuevoMarcador
    })
  }

  irMarcador() {
    // this.mapa.flyTo()
  }


}
