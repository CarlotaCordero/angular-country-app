import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor( private CountriesService: CountriesService ) { }

  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byCountry.countries;
    this.initialValue = this.CountriesService.cacheStore.byCountry.term;
  }

  searchByCountry(term: string): void {
    this.CountriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries
      });
  }

}
