import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  anoAtual = new Date().getFullYear();

  // Altere estes links para os seus perfis reais
  readonly github = 'https://github.com/ArtVieiraSantana';
  readonly linkedin = 'https://www.linkedin.com/in/arthur-vieira-santana-390757264/';
}
