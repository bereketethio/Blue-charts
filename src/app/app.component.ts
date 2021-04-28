import { Component } from '@angular/core';
import { ChartType } from './blue-chart/chart-packages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: any[];
  geoData: any[];

  title = 'Daily Activity';

  pieChart = ChartType.PieChart;
  areaChart = ChartType.AreaChart;
  geoChart = ChartType.GeoChart;

  chartOptions = {
   
      width: '100%',
      height: 400,
      fontSize: 18,
      series: {
        5: {
          type: 'line',
          lineDashStyle: [2, 2], 
          lineWidth: 6,
          color: '#D6502E',
        },
      }
  };

  ngOnInit(): void {
    this.data = [
      [
        'Month',
        'Bolivia',
        'Ecuador',
        'Madagascar',
        'Papua New Guinea',
        'Rwanda',
        'Threshold',
        { type: 'string', role: 'tooltip' },
      ],
      ['2004/05', 165, 938, 522, 998, 450, 400, 'custom tooltip for 2004/05'],
      ['2005/06', 135, 1120, 599, 1268, 288, 400, 'custom tooltip for 2005/06'],
      ['2006/07', 157, 1167, 587, 807, 397, 400, 'custom tooltip for 2006/07'],
      ['2007/08', 139, 1110, 615, 968, 215, 400, 'custom tooltip for 2007/08'],
      ['2008/09', 136, 691, 629, 1026, 366, 400, 'custom tooltip for 2008/09'],
    ];

    this.geoData = [
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
    ];
  }

  change(value) {
    alert('User Selected :' + value);
  }
}
