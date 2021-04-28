import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChartType } from './chart-packages';
import { ChartService } from './Chart.service';

//chartColors
export enum MoodysBlueStyles{
  Blue= '#0028a0',
  Cyan= '#009FDF',
  Gray= '#75787B',
  Orange= '#78be20',
  Red = '#ba0c2f',
  FontFamily = 'BlissPro'
}

function randomString(length: number, chars: string) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

@Component({
  selector: 'blue-chart',
  templateUrl: './blue-chart.component.html',
  styleUrls: ['./blue-chart.component.scss'],
})
export class BlueChartComponent implements OnInit {
  @Input() chartOptions={};

  @Input() type: ChartType;

  @Input() title: string;

  @Input() data = [];

  elementId: string = randomString(
    32,
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );

  @Output() change: EventEmitter<any> = new EventEmitter();

  chartWrapper: google.visualization.ChartWrapper;

  finalChartOptions: Object;
 
  //only accept chartOptions as input
  private get _defaultChartOptions() {
    return  {
        title: this.title,
        colors: [MoodysBlueStyles.Blue, MoodysBlueStyles.Cyan, MoodysBlueStyles.Gray, MoodysBlueStyles.Orange, MoodysBlueStyles.Red],
        titleTextStyle: {
          color: MoodysBlueStyles.Blue,
          fontName: MoodysBlueStyles.FontFamily
        },
    };
  }
  
  constructor(private chartService: ChartService) {}

  ngOnInit() {
    
    this.finalChartOptions = {
      ...this._defaultChartOptions,
      ...this.chartOptions
     }

    this.buildChart();
  }

  buildChart() {
    this.drawChart();
  }

  drawChart() {
    this.chartService.loadChartPackages(this.type).subscribe(()=> {
    
    this.chartWrapper = new google.visualization.ChartWrapper({
      containerId: this.elementId,
      chartType: this.type,
      dataTable: this.data,
    
      options: this.finalChartOptions
    });

    google.visualization.events.addListener(
      this.chartWrapper,
      'select',
     ( this.selectHandler.bind(this))
    );
    this.chartWrapper.draw();
    })
  
  }

  selectHandler(evt : any) {
    let selectedItem = this.chartWrapper.getChart().getSelection()[0];

    if (selectedItem) {
      let value = this.chartWrapper
        .getDataTable()
        .getValue(selectedItem.row, 0);
      this.change.emit(value);
    }
  }
}
