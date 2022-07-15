import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { PerfilComponent } from './perfil.component';

const routes: Routes = [
  {
    path: ':idUsuario',
    component: PerfilComponent,
  },
  {
    path: 'pessoal/editar',
    component: EditarPerfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
