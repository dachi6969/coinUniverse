import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DashboardHeader } from "./dashboard-header/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar/dashboard-sidebar";
import { AuthModal } from "../../shared/components/auth-modal/auth-modal";


@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, DashboardHeader, DashboardSidebar, AuthModal],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
