import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DashboardHeader } from "./dashboard-header/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar/dashboard-sidebar";


@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, DashboardHeader, DashboardSidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
