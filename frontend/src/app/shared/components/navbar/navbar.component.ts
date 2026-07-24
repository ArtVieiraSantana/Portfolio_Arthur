import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuAberto = signal(false);
  scrolled = signal(false);

  readonly links = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.menuAberto.update((v) => !v);
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }
}
