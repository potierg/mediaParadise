import { Component, OnInit } from '@angular/core';
import { ScraperService } from '../scraper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private scraperService: ScraperService) { }

  ngOnInit() {
    console.log('hello');
    this.scraperService.scrappSite().subscribe(data => console.log("=>", data));
  }
}
