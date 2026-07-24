export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  // Campo honeypot anti-spam: deve permanecer vazio.
  // Bots costumam preencher todos os campos de um formulário, humanos não veem este campo.
  website?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
