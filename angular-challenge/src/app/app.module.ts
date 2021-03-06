import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageDetailsComponent } from './package-list/package-details/package-details.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PackageComplianceComponent } from './package-list/package-details/package-compliance/package-compliance.component';
import { PackageBreakdownComponent } from './package-list/package-details/package-breakdown/package-breakdown.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MaterialModule,
    BrowserAnimationsModule,
  ],
  declarations: [
      AppComponent,
      PackageListComponent,
      PackageDetailsComponent,
      PackageComplianceComponent,
      PackageBreakdownComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
