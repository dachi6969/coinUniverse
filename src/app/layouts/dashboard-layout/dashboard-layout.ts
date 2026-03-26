import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DashboardHeader } from "./dashboard-header/dashboard-header";
import { DashboardFooter } from "./dashboard-footer/dashboard-footer";


@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, DashboardHeader, DashboardFooter],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
