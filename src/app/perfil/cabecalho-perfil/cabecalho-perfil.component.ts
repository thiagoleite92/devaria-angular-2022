import { DevagramUsuarioApiService } from 'src/app/compartilhado/servicos/devagram-usuario-api.service';
import { Router } from '@angular/router';
import { UsuarioDevagram } from './../../compartilhado/tipos/usuario-devagram.type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho-perfil',
  templateUrl: './cabecalho-perfil.component.html',
  styleUrls: ['./cabecalho-perfil.component.scss'],
})
export class CabecalhoPerfilComponent implements OnInit {
  @Input() usuario: UsuarioDevagram | null = null;
  constructor(
    private router: Router,
    private servicoUsuario: DevagramUsuarioApiService
  ) {}

  ngOnInit(): void {}

  public voltarParaHome() {
    this.router.navigateByUrl('/');
  }

  public async alternarSeguir(): Promise<void> {
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

  public obterTextoBotaoPrincipal(): string {
    return this.usuario?.segueEsseUsuario ? 'Desseguir' : 'Seguir';
  }

  public obterCorBotaoPrincipal(): string {
    return this.usuario?.segueEsseUsuario ? 'outline' : 'primaria';
  }
}
