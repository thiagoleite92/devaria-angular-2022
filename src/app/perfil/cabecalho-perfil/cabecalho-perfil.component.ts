import { DevagramUsuarioApiService } from 'src/app/compartilhado/servicos/devagram-usuario-api.service';
import { Router } from '@angular/router';
import { UsuarioDevagram } from './../../compartilhado/tipos/usuario-devagram.type';
import { Component, Input, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/compartilhado/autenticacao/autenticacao.service';

@Component({
  selector: 'app-cabecalho-perfil',
  templateUrl: './cabecalho-perfil.component.html',
  styleUrls: ['./cabecalho-perfil.component.scss'],
})
export class CabecalhoPerfilComponent implements OnInit {
  @Input() usuario: UsuarioDevagram | null = null;
  public estaPerfilPessoal: boolean = false;
  constructor(
    private router: Router,
    private servicoUsuario: DevagramUsuarioApiService,
    private servicoAutenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/perfil/pessoal') {
      this.estaPerfilPessoal = true;
    }
  }

  public voltarParaHome() {
    this.router.navigateByUrl('/');
  }

  public async manipularCliqueBotaoPrincipal(): Promise<void> {
    if (this.estaPerfilPessoal) {
      this.redirecionarParaTelaDeEdicaoPerfil();
      return;
    }

    await this.alternarSeguir();
  }

  public obterTextoBotaoPrincipal(): string {
    if (this.estaPerfilPessoal) {
      return 'Editar Perfil';
    }

    if (this.usuario?.segueEsseUsuario) {
      return 'Desseguir';
    }

    return 'Seguir';
  }

  public obterCorBotaoPrincipal(): string {
    if (this.usuario?.segueEsseUsuario || this.estaPerfilPessoal) {
      return 'outline';
    }

    return 'primaria';
  }

  public logout(): void {
    this.servicoAutenticacao.logout();
  }

  private async alternarSeguir() {
    if (!this.usuario) {
      return;
    }

    try {
      console.log(this.usuario?._id);
      await this.servicoUsuario.alternarSeguir(this.usuario?._id);
      this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario;
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao seguir/desseguir');
    }
  }

  private redirecionarParaTelaDeEdicaoPerfil(): void {
    this.router.navigateByUrl('perfil/pessoal/editar');
  }
}
