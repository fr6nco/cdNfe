import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopologyComponent } from './topology/topology.component';
import { TopologyResolver, AssetResolver } from './resolvers/topology.resolver';
import { StateComponent } from './state/state.component';

const routes: Routes = [
  {
    path: 'topology',
    component: TopologyComponent,
    resolve: {
      topo: TopologyResolver,
      assets: AssetResolver
    }
  },
  {
    path: 'state',
    component: StateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
