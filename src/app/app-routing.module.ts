import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product-list',
        loadChildren: () =>
          import('./store/store.module').then(m => m.StoreModule)
      },
      {
        path: 'product-purchase',
        loadComponent: () =>
          import('./purchase/components/product-purchase/product-purchase.components').then(m => m.ProductPurchaseComponent)
      },
      {
        path: '**',
        redirectTo: '/product-list'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
