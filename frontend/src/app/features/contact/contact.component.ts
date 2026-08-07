import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

type EstadoEnvio = 'idle' | 'enviando' | 'sucesso' | 'erro';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective, MagneticDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  // Altere estes dados para os seus dados reais
  readonly email = 'arthur1vieira2@gmail.com';
  readonly telefone = '(11) 97866-2084';
  readonly localizacao = 'São Paulo Zona Sul, Brasil';
  readonly github = 'https://github.com/ArtVieiraSantana';
  readonly linkedin = 'https://www.linkedin.com/in/arthur-vieira-santana-390757264/';

  estado = signal<EstadoEnvio>('idle');
  mensagemRetorno = signal('');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // honeypot anti-spam: campo escondido via CSS, deve ficar sempre vazio
    website: ['']
  });

  get f() {
    return this.form.controls;
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.estado.set('enviando');

    this.contactService.enviarMensagem(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.estado.set('sucesso');
        this.mensagemRetorno.set(res.message || 'Mensagem enviada com sucesso! Obrigado pelo contato.');
        this.form.reset();
      },
      error: (err) => {
        this.estado.set('erro');
        this.mensagemRetorno.set(
          err?.error?.message || 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.'
        );
      }
    });
  }
}
