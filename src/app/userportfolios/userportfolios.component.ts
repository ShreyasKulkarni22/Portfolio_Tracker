import { Component } from '@angular/core';
import { portfolio } from '../Models/portfolio';
import { PortfolioService } from '../service/portfolio.service';

@Component({
  selector: 'app-userportfolios',
  templateUrl: './userportfolios.component.html',
  styleUrls: ['./userportfolios.component.css']
})
export class UserportfoliosComponent {
  portfolios:Array<portfolio>=[]
  constructor(private portfolioservice:PortfolioService){

  }
  ngOnInit(): void {
    this.getPortfolios()
  }

  getPortfolios(){
    this.portfolioservice.getPortfolio("Shreyas@2212").subscribe(res=>{
      this.portfolios=res
    })
  }

  deletePortfolio(id:number){
    this.portfolioservice.deletePortfolio(id).subscribe(res=>{
      console.log("deleted");
      this.getPortfolios()
    });
  }
}
