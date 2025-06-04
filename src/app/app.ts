import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2648204793.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:137379682.
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'myapp';
}
