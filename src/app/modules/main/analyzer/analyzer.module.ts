import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider'; 

import { CoreModule } from 'src/app/core/core.module';

import AnalyzerComponent from './analyzer.component';
import { CallComponent } from 'src/app/core/components/call/call.component';
import { ROUTES } from './analyzer.routes';

@NgModule({
    declarations: [
        AnalyzerComponent,
        CallComponent
    ],
    imports: [
        CoreModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        MatSliderModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        CommonModule,
        FormsModule
    ],
    bootstrap: [AnalyzerComponent]
})
export class AnalyzerModule {}
