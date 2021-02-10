# AngularChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Installation

In addition to installing angular, also run `npm install angular-in-memory-web-api --save` or `yarn add angular-in-memory-web-api` to install the required in-memory database system.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Challenge Description

Welcome to Arqflow's Angular coding challenge. This is a front-end focused exercise that we will use to assess your skills on developing client-side features.

The structure of the challenge is loosely based on one of our products in developments "ArqSource". ArqSource is an advanced sourcing tool for businesses. The product centers around the "Package" concept. 
A Package is request for bid from the buyer to the seller (also called RFQ, RFP, RFT). A package consists of one or more line items that sellers have to provide rates for. 
Each line item has a "scope" associated with it that indicates whether a rate is required for it or not. In addition to this, sections are used to group together line items.
Sections also have a scope, if a section is required, all 'required' line items within it will require rates. If a section is 'optional', either all the required line items within it will require rates, or none of the line items withing the section will require rates.

In addition, packages have compliance fields which are general form fields to be filled out by suppliers when submitting their bids. Each fields can either be required or optional.

You have been provided with the models in `src/app/models.ts`, study them carefully before starting the challenge.

Bids (or quotes) are submitted by suppliers based on the package structure (sections, line items etc.). The buyer can then view a side-by-side comparison of bids showing both a breakdown of rates and compliance values.
See `src/ComparisonExample.xlsx` for an example of a comparison report.

## Challenge Technical Information

All the data should be loaded into the browser memory (via the in memory db). You should be able to access the model data through api calls (e.g `api/users` will fetch all the users), so you should be able to build the required services based on that.

###Api Endpoints:

####users: `api/users`
####accounts: `api/accounts`
####packages: `api/packages`
####sections: `api/sections`
####line_items: `api/line_items`
####compliance_fields: `api/compliance_fields`
####bids: `api/bids`
####bid_rates: `api/bid_rates`
####bid_compliance_values: `api/bid_compliance_values`

## Challenge Requirements

Using the provided information and pre-loaded data, please deliver a package list view, and a package detail (comparison) view (with breakdown and compliance pages) similar to the Excel example we have provided.

The client should pull the data from the database via the API endpoints. You can structure the components however you wish and use any UI libraries of your choosing.

Extra points will be given if you can make the tables searchable and if you can color the rates and amounts based on value (green for lower, red for higher).

Good Luck!
