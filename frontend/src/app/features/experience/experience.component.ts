import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../core/models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  // Edite os dados abaixo com suas experiências reais (mantenha só 2, como solicitado)
  readonly experiences: Experience[] = [
    {
      id: 1,
      role: 'Desenvolvedor Fullstack',
      company: 'Blend it & Usiminas',
      period: '2026 - Atual',
      description: 'Estágio',
      highlights: [
        'Auxiliar com o banco de Dados (SQL).',
        'Auxiliar no desenvolvimento Java - Framework Angular - Ferramentas Git - Ferramentas Office (Word, Excel, Powerpoint)'
      ]
    },
    {
      id: 2,
      role: 'Desenvolvedor Fullstack',
      company: 'Projetos Profissionais',
      period: '2026 - Atual',
      description: 'Desenvolvimento FullStack',
      highlights: [
        'Desenvolvimento de landing pages com animação',
        'CRM personalizado',
        'Painéis administrativos (Dashboard)',
        'APIs'
      ]
    }
  ];
}
