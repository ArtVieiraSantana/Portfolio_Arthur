import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly projects: Project[] = [
    {
      id: 1,
      title: 'Portaria-Digital',
      description:
        'Sistema web para gerenciamento de acesso em condomínios e empresas, com cadastro de moradores, visitantes e prestadores de serviço, além do registro de entradas e saídas de forma segura e organizada(login: sindico senha: 654321).',
      tags: ['Java', 'Spring-boot','Angular'],
      image: 'assets/Capa_Portaria_Digital.png',
      repoUrl: '#',
      liveUrl: 'https://portaria-digital.onrender.com/'
    },
    {
      id: 2,
      title: 'Papelaria Landing Page',
      description:
        'Landing page desenvolvida para apresentar os produtos e serviços de uma papelaria, com design responsivo, navegação intuitiva e foco em destacar a identidade visual da marca e facilitar o contato com clientes.',
      tags: ['Responsive', 'HTML', 'CSS'],
      image: 'assets/Capa_Papelaria.png',
      repoUrl: 'https://github.com/ArtVieiraSantana/Papelaria_landing_page.git',
      liveUrl: '#'
    },
    {
      id: 3,
      title: 'Jogo Java',
      description:
        'Um jogo RPG de texto em Java que contém áudio para suavizar a experiência do usuário. Projeto feito em grupo com foco em backend.',
      tags: ['Backend', 'Java'],
      image: 'assets/Capa_Jogo_Java.png',
      repoUrl: 'https://github.com/stapani7/Grupo-3---Turma-A',
      liveUrl: '#'
    }
  ];
}
