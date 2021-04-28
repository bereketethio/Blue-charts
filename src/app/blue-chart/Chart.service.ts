import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ChartPackages, ChartType } from './chart-packages';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private scriptSource = 'https://www.gstatic.com/charts/loader.js';
  private scriptLoadSubject = new Subject<null>();
  
constructor(private zone: NgZone) { }

public loadChartPackages(type:ChartType): Observable<null> {
  return this.loadGoogleCharts().pipe(
    switchMap(() => {
      return new Observable<null>(observer => {
        const config = {
          packages: [this.getPackageForChart(type)],
          mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY',
          safeMode: false,
        };
        google.charts.load('current', config);
        google.charts.setOnLoadCallback(() => {
          this.zone.run(() => {
            observer.next();
            observer.complete();
          });
        });
      });
    })
  );
}

private loadGoogleCharts(): Observable<null> {

    const script = this.createGoogleChartsScript();
    script.onload = () => {
      this.zone.run(() => {
        this.scriptLoadSubject.next();
        this.scriptLoadSubject.complete();
      });
    };

    script.onerror = () => {
      this.zone.run(() => {
        console.error('Failed to load the google charts script!');
        this.scriptLoadSubject.error(new Error('Failed to load the google charts script!'));
      });
    };
  
  return this.scriptLoadSubject.asObservable();
}

private createGoogleChartsScript(): HTMLScriptElement {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = this.scriptSource;
  script.async = true;
  document.getElementsByTagName('head')[0].appendChild(script);
  return script;
}

getPackageForChart(type: ChartType): string {
  return ChartPackages[type];
}

}
