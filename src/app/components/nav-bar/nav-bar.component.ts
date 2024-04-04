import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener("DOMContentLoaded", () => {
        this.setupNavBar();
      });
    }
    
  }

  setupNavBar() {
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const navbarToggle = document.querySelector('.navbar-toggler');
        if (navbarToggle && window.getComputedStyle(navbarToggle).display !== 'none') {
          (navbarToggle as HTMLElement).click();
        }
      });
    });
  }
}
