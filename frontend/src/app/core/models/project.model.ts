export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: string; // classe do Font Awesome, ex: 'fa-solid fa-laptop-code'
  repoUrl: string; // link do repositório (GitHub) - adicione manualmente
  liveUrl: string; // link do projeto publicado/demo - adicione manualmente
}
