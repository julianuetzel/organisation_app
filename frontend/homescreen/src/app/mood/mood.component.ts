import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ChartColor {
  backgroundColor: string;
  color: string;
}

interface Feeling {
  type: string;
  value: number;
}

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss'],
})
export class MoodComponent implements OnInit {
  date = new Date()
  selected = 'weekly';

  chartColors: ChartColor[] = [
    {backgroundColor: 'rgba(180, 253, 255, 0.2)', color: 'rgb(180, 253, 255)'}, //türkis
    {backgroundColor: 'rgba(252, 202, 0, 0.2)', color: 'rgb(252, 202, 0)'}, //orange
    {backgroundColor: 'rgba(54, 162, 235, 0.2)', color: 'rgb(54, 162, 235)'}, //blau
    {backgroundColor: 'rgba(204, 247, 131, 0.2)', color: 'rgb(204, 247, 131)'}, //grün
    {backgroundColor: 'rgba(254, 250, 131, 0.2)', color: 'rgb(254, 250, 131)'}, //gelb
    {backgroundColor: 'rgba(254, 206, 152, 0.2)', color: 'rgb(254, 206, 152)'}, //hell-orange
    {backgroundColor: 'rgba(222, 134, 143, 0.2)', color: 'rgb(222, 134, 143)'}, //hell-rot
    {backgroundColor: 'rgba(189, 49, 36, 0.2)', color: 'rgb(189, 49, 36)'}, //rot
    {backgroundColor: 'rgba(184, 134, 248, 0.2)', color: 'rgb(184, 134, 248)'}, //lila
    {backgroundColor: 'rgba(127, 131, 247, 0.2)', color: 'rgb(127, 131, 247)'}, //dunkel-lila
  ];

  feelings: Feeling[] = [
    {type: 'sadness', value: 0},
    {type: 'happyness', value: 0},
    {type: 'shame', value: 0},
    {type: 'anger', value: 0},
    {type: 'fear', value: 0},
    {type: 'fault', value: 0}
  ]

  data = [{
      label: 'Monday',
      data: [6, 6, 9, 8, 6, 5],
      fill: true,
      backgroundColor: this.chartColors[0].backgroundColor,
      borderColor: this.chartColors[0].color,
      pointBackgroundColor: this.chartColors[0].color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.chartColors[0].color
    }, {
      label: 'Tuesday',
      data: [3, 5, 4, 2, 10, 3],
      fill: true,
      backgroundColor: this.chartColors[1].backgroundColor,
      borderColor: this.chartColors[1].color,
      pointBackgroundColor: this.chartColors[1].color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.chartColors[1].color,
    }];

  data_today_exists=false;

  constructor() { }

  ngOnInit(): void {
    const resumeChart = new Chart("resumeChart", {
      type: 'radar',
      data: {
        labels: [
          'Sadness',
          'Happyness',
          'Anger',
          'Shame',
          'Fault',
          'Fear'
        ],
        datasets: this.data
      },
      options: {
        scales: {
          r: {
            ticks: {
              display: false
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    });
  }

  setData(type: string, value: number): void {
    var index = this.feelings.findIndex((feeling) => feeling.type == type)
    console.log(this.feelings[index].value)
    this.feelings[index].value = value;
    console.log(this.feelings[index].value)
  }

  setCanvas(): void {
    var data_today = [{
      label: 'today',
      data: [this.feelings[0].value,
             this.feelings[1].value, 
             this.feelings[2].value, 
             this.feelings[3].value, 
             this.feelings[4].value, 
             this.feelings[5].value],
      fill: true,
      backgroundColor: this.chartColors[0].backgroundColor,
      borderColor: this.chartColors[0].color,
      pointBackgroundColor: this.chartColors[0].color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.chartColors[0].color
    }];

    var todaysChart = new Chart("todaysChart", {
      type: 'radar',
      data: {
        labels: [
          'Sadness',
          'Happyness',
          'Anger',
          'Shame',
          'Fault',
          'Fear'
        ],
        datasets: data_today
      },
      options: {
        scales: {
          r: {
            ticks: {
              display: false
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    });

    this.data_today_exists=true;
  }

}
