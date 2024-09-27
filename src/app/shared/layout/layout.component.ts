import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports:[
    RouterModule,
    ToolbarModule, 
    CommonModule,
    ButtonModule
  ], 
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
items: MenuItem[]|undefined;

ngOnInit():void{
  this.items = [
    {
      label:'Home',
      icon:'pi pi-home'
    },
    {
      label:'Register',
      icon: 'pi pi-star'
    },
    {
      label:'Login',
      icon:'pi pi-envelope'
    }
  ]

}

}
