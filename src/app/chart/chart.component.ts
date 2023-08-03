import { MarketdataService } from '../service/marketdata.service';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  //query
  Stock: any;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | undefined;
  responseData: any;
  chartData: any;

  constructor(
    private market: MarketdataService,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.Stock = res['name'];
    });

    this.fetchData(this.Stock, '7');
  }

  createChart(labels: any[], closeData: any[], pointradius: number): void {
    this.ngZone.run(() => {
      // Ensure that the chartCanvas element is available before creating the chart
      if (this.chartCanvas && this.chartCanvas.nativeElement) {
        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(this.chartCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: labels.reverse(),
            datasets: [
              {
                data: closeData.reverse(),
                label: 'Close Price',
                pointRadius: pointradius,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: {
                  target: 'origin',
                  above: 'rgba(0, 0, 255, 0.2)',
                },
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                
                time: {
                  unit: 'month',
                  displayFormats: {
                    month: 'MMM YYYY',
                  },
                },
                display:true
              },
            },
          },
        });
      } else {
        console.error('Failed to create chart: canvas element not found.');
      }
    });
  }

  fetchData(stockname: string, duration: string) {
    if (parseInt(duration) > 1) {
      this.market.getHistoricalData(stockname, duration).subscribe((res) => {
        this.responseData = res;
        const labels = this.responseData['historical'].map(
          (rec: { label: any }) => rec['label']
        );
        const closeData = this.responseData['historical'].map(
          (rec: { close: any }) => rec['close']
        );

        if (parseInt(duration) > 400) {
          this.createChart(labels, closeData, 0.1);
        } else {
          this.createChart(labels, closeData, 3);
        }
      });
    } else if (parseInt(duration) == 1) {
      this.market.getHistoricalDataForDay(stockname).subscribe((res) => {
        this.responseData = res;
        console.log(this.responseData);

        this.responseData = this.responseData.slice(0, 14);
        console.log(this.responseData);

        setTimeout(() => {
          const labels = this.responseData['historical'].map(
            (rec: { label: any }) => rec['label']
          );
          const closeData = this.responseData['historical'].map(
            (rec: { close: any }) => rec['close']
          );

          if (parseInt(duration) > 400) {
            this.createChart([], closeData, 0.1);
          } else {
            this.createChart(labels, closeData, 3);
          }
        }, 3000);
      });
    }
  }
}
