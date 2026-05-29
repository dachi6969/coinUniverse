import { Component, inject } from '@angular/core';
import { TransactionHistory } from "../../components/transaction-history/transaction-history";
import { PortfolioService } from '../../services/portfolio-service';
import { CommonModule } from '@angular/common';
import { HighlightCards } from "../../components/highlight-cards/highlight-cards";
import { AvalibleAssets } from "../../components/avalible-assets/avalible-assets";
import { PortfolioDonutChart } from "../../components/portfolio-donut-chart/portfolio-donut-chart";

@Component({
  selector: 'app-portfolio-page',
  imports: [
    TransactionHistory, 
    CommonModule, 
    HighlightCards, 
    AvalibleAssets, 
    PortfolioDonutChart
  ],
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.css',
})
export class PortfolioPage {

  private readonly portfolioService = inject(PortfolioService);
  public readonly user = this.portfolioService.user;
  public readonly isLoggedIn = this.portfolioService.isLoggedIn;

  public readonly transactions$ = 
  this.portfolioService.coinTransaction$;

  public readonly hightlightsData$ = 
  this.portfolioService.hightlightsData$

  public readonly avalibleAssets$ = 
  this.portfolioService.avalibleCoins$

}
