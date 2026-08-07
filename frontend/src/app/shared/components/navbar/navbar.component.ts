import { AfterViewInit, Component, HostListener, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  menuAberto = signal(false);
  scrolled = signal(false);
  escondida = signal(false);
  linkAtivo = signal('#home');

  private ultimaPosicao = 0;
  private observer?: IntersectionObserver;

  readonly links = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' }
  ];

  ngAfterViewInit(): void {
    // Destaca o link do menu conforme a seção visível na tela
    const secoes = this.links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.linkAtivo.set(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    secoes.forEach((secao) => this.observer?.observe(secao));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 20);

    // Esconde a navbar ao rolar para baixo, mostra ao rolar para cima
    if (!this.menuAberto()) {
      if (y > 200 && y > this.ultimaPosicao + 8) {
        this.escondida.set(true);
      } else if (y < this.ultimaPosicao - 8 || y < 200) {
        this.escondida.set(false);
      }
    }
    this.ultimaPosicao = y;
  }

  toggleMenu(): void {
    this.menuAberto.update((v) => !v);
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }
}
