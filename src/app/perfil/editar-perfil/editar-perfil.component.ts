import { AutenticacaoService } from 'src/app/compartilhado/autenticacao/autenticacao.service';
import { UsuarioLogado } from './../../compartilhado/autenticacao/usuario-logado.type';
import { Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {
  public usuarioLogado?: UsuarioLogado | null;
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private servicoAutenticacao: AutenticacaoService
  ) {
    this.usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();
    this.form = this.fb.group({
      file: [null],
      nome: [
        this.usuarioLogado?.nome,
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {}

  public obterReferenciaInput(nomeInput: string): AbstractControl {
    return this.form.controls[nomeInput];
  }

  public voltarParaHome(): void {
    this.router.navigateByUrl('/');
  }

  public async atualizarPerfil(): Promise<void> {
    console.log('atualizarPerfil');
  }
}
