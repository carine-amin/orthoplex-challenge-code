import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";
import {forkJoin} from "rxjs";
import {CommonModule, CurrencyPipe, DecimalPipe} from "@angular/common";
import {ProgressBarModule} from "primeng/progressbar";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    CardModule,
    ChartModule,
    CurrencyPipe,
    DecimalPipe,
    ProgressBarModule,
    CommonModule,
    ProgressSpinnerModule
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gdpChartData: any;
  populationChartData: any;
  unemployedChartData: any;
  countries: string[] = ['USA', 'CHN', 'IND', 'FRA', 'DEU'];
  options: any;
  documentStyle: any;
  textColor: string = '';
  backgroundColor: string[] = [];
  borderColor: string[] = [];
  globalPopulation: number = 0;
  globalGDP: number = 0;
  globalUnemploymentRate: number = 0;
  year: string = '';
  isLoadingGlobal = false;
  isLoadingPopulation = false;
  isLoadingGDP = false;
  isLoadingUnemployedRate = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.documentStyle = getComputedStyle(document.documentElement);
    this.textColor = this.documentStyle.getPropertyValue('--text-color');
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
    this.backgroundColor = [this.documentStyle.getPropertyValue('--blue-200'),
      this.documentStyle.getPropertyValue('--yellow-200'),
      this.documentStyle.getPropertyValue('--green-200'),
      this.documentStyle.getPropertyValue('--red-200'),
      this.documentStyle.getPropertyValue('--pink-200')];
    this.borderColor = [this.documentStyle.getPropertyValue('--blue-400'),
      this.documentStyle.getPropertyValue('--yellow-400'),
      this.documentStyle.getPropertyValue('--green-400'),
      this.documentStyle.getPropertyValue('--red-400'),
      this.documentStyle.getPropertyValue('--pink-400')];
    this.loadGDPData();
    this.loadPopulationData();
    this.loadUnemployedRateData();
    this.loadGlobalKPIs();
  }

  loadGDPData(): void {
    this.isLoadingGDP = true;
    const requests = this.countries.map(country =>
      this.apiService.getGDPData(country)
    );

    forkJoin(requests).subscribe(responses => {

      const labels = this.countries;
      const data = responses.map(res => res[1][0]?.value ?? 0);

      this.gdpChartData = {
        labels: labels,
        datasets: [
          {
            label: 'GDP (Current USD)',
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            data: data
          }
        ]
      };
      this.isLoadingGDP = false;
    });
  }

  loadPopulationData(): void {
    this.isLoadingPopulation = true;
    const requests = this.countries.map(country =>
      this.apiService.getPopulationData(country)
    );

    forkJoin(requests).subscribe(responses => {
      const labels = this.countries;
      const data = responses.map(res => res[1][0]?.value ?? 0);

      this.populationChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Population',
            backgroundColor:this.backgroundColor,
            borderColor: this.borderColor,
            data: data
          }
        ]
      };
      this.isLoadingPopulation = false;
    });
  }
  loadUnemployedRateData(): void {
    this.isLoadingUnemployedRate = true;
    const requests = this.countries.map(country =>
      this.apiService.getUnemployedRateData(country)
    );

    forkJoin(requests).subscribe(responses => {
      const labels = this.countries;
      const data = responses.map(res => res[1][0]?.value ?? 0);

      this.unemployedChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Unemployed Rate',
            backgroundColor:this.backgroundColor,
            borderColor: this.borderColor,
            data: data
          }
        ]
      };
      this.isLoadingUnemployedRate = false;
    });
  }

  loadGlobalKPIs(): void {
    this.isLoadingGlobal = true;
    this.apiService.getGlobalPopulation()
      .subscribe(response => {
        this.globalPopulation = response[1][0].value;
        this.year = response[1][0].date;
        this.checkLoadingStatus();
      });

    this.apiService.getGlobalGPD()
      .subscribe(response => {
        this.globalGDP = response[1][0].value;
        this.checkLoadingStatus();
      });

    this.apiService.getGlobalUnemployedRate()
      .subscribe(response => {
        this.globalUnemploymentRate = response[1][0].value;
        this.checkLoadingStatus();
      });
  }

  checkLoadingStatus(): void {
    if (this.globalPopulation !== 0 && this.globalGDP !== 0 && this.globalUnemploymentRate !== 0) {
      this.isLoadingGlobal = false;
    }
  }
}
