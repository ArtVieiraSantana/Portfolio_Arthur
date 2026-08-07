import { AfterViewInit, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit {
  // Controla a animação de entrada escalonada (fade + translateY) no primeiro carregamento
  entrou = signal(false);

  ngAfterViewInit(): void {
    // Pequeno atraso para garantir que o layout já foi pintado antes de animar
    requestAnimationFrame(() => requestAnimationFrame(() => this.entrou.set(true)));
  }

  // Altere estes links para os seus perfis reais
  readonly github = 'https://github.com/ArtVieiraSantana';
  readonly linkedin = 'https://www.linkedin.com/in/arthur-vieira-santana-390757264/';
  readonly email = 'mailto:arthur1vieira2@gmail.com';

  readonly badges = [
    { icon: 'fa-brands fa-java', top: '10%', left: '-8%' },
    { icon: 'fa-brands fa-angular', top: '65%', left: '-12%' },
    { icon: 'fa-brands fa-html5', top: '5%', left: '82%' },
    { icon: 'fa-brands fa-git-alt', top: '70%', left: '85%' }
  ];
}
