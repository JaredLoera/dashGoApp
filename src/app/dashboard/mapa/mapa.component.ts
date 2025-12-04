import { Component, OnInit, AfterViewInit, ComponentRef, Input } from '@angular/core';
import * as L from 'leaflet';
import { reports } from 'src/app/core/interfaces/reports';



  const iconRetinaUrl = 'assets/media/marker-icon-2x.png';
  const iconUrl = 'assets/media/marker-icon.png';
  const shadowUrl = 'assets/media/marker-shadow.png';

  const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true
})
export class MapaComponent implements AfterViewInit {

  @Input() reports: reports[] = [];

  private map: L.Map | undefined;


  // Se ejecuta después de que la vista (incluyendo el div#mapa) se haya inicializado
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 300);
  }
//25.532794630353543, -103.3228110038183
  private initMap(): void {
    // 1. Inicializar el objeto mapa
    // 'mapa' es el ID del div en el HTML 25.5335812,-103.3867023
    this.map = L.map('mapa').setView([25.5335812, -103.3867023], 13); // [lat, lng], zoom inicial

    // 2. Añadir la capa de tiles (ej. OpenStreetMap)
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '© OpenStreetMap contributors' // Es importante dar la atribución
    });

    tiles.addTo(this.map); // Añadir la capa al mapa

    // 3. (Opcional) Añadir un marcador
    if (this.map) {

      for (const report of this.reports) {
        //convertir de string a numero
        const marker = L.marker([Number(report.latitude), Number(report.longitude)]); // Usar latitud y longitud del reporte
        marker.addTo(this.map)
          .bindPopup(`<b>${report.reportType.name}</b><br>${report.description}`);
      }
    }
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

}
