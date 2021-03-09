import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../../../app.shared.module'
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component'; 
import { IdeasCategoryModule } from './ideas-category/ideas-category.module';
import { FeaturedProfessionalsModule } from './featured-professionals/featured-professionals.module';
import { FeaturedProductsModule } from './featured-products/featured-products.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    HomeRoutingModule,
    IdeasCategoryModule,
    FeaturedProfessionalsModule,
    FeaturedProductsModule
  ]
})
export class HomeModule { }
