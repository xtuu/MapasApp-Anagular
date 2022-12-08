import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
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

    this.leerLocalStorage()
    //cambiar la aparencia del marcador - opcional
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'holisss'

    // const marker = new mapboxgl.Marker()
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
      marker: nuevoMarcador
    })

    this.guardarMacadoresLocalStorage()

    nuevoMarcador.on('dragend', () => {
      this.guardarMacadoresLocalStorage();
    });

  }

  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }



  guardarMacadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = []

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });

    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))

  }


  leerLocalStorage() {

    if (!localStorage.getItem('marcadores')) { return }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach(m => {
      const nuevoMarcador = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)

      this.marcadores.push({
        marker: nuevoMarcador,
        color: m.color
      });

      nuevoMarcador.on('dragend', () => {
        this.guardarMacadoresLocalStorage();
      });

    })

  }


  borrarMarcador(i: number) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMacadoresLocalStorage()

  }



}
