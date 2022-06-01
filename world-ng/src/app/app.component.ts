import {Component, OnInit} from '@angular/core';
import {WorldService} from "../services/world-service";
import {Country} from "../model/country";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public continents: Array<String> = [];
  public countries: Array<Country> = [];
  public continent: String = "Asia"

  constructor(private worldService: WorldService) {
  }

  list() {
    this.worldService.getCountriesByContinent(this.continent).subscribe(countries => this.countries = countries);
  }

  ngOnInit(): void {
    this.worldService.getContinents().subscribe(continents => this.continents = continents);
  }
}
