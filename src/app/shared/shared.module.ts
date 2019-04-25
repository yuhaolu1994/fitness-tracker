import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule, // ngif directive
    FormsModule, // sign up component
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule, // ngif directive
    FormsModule, // sign up component
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
