import { Component } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';

@Component({
  selector: 'app-send-dynamic-message',
  templateUrl: './send-dynamic-message.component.html',
  styleUrls: ['./send-dynamic-message.component.scss', '../messaging-module.scss']
})
export class SendDynamicMessageComponent {
  constructor(private countryService: CountryService){}
  ngOnInit(): void {
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
  });
  }
  countries: any[] = [];
  valRadio:boolean = true;
  
  activeIndex: number = 0;
  selectedCountryAdvanced: any[] = [];
  filteredCountries: any[] = [];
  filterCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
        const country = this.countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    
    this.filteredCountries = filtered;
}
date: Date | undefined;
}
