import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { ReposComponent } from './repos/repos.component';
import { RepoSortPipe } from './repos/repo-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ReposComponent,
        RepoSortPipe
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        PaginationModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

