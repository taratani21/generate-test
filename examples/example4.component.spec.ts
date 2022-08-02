import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { Example4Component } from './example4.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceFive } from '@ngx-serviceFive/core';

describe('Example4Component', () => {
  let fixture: ComponentFixture<Example4Component>;
  let component: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        Example4Component,

      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        },
        ServiceFive
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Example4Component);
    component = fixture.componentInstance;
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run SetterDeclaration #pppCcccc', () => {

    component.pppCcccc = {};

  });

  it('should run GetterDeclaration #pppCcccc', () => {

    const pppCcccc = component.pppCcccc;

  });

  it('should run #ngOnInit()', () => {
    component.route = component.route || {};
    component.route.snapshot = {
      data: {
        'iiiiiiiii': {}
      }
    };
    spyOn(component, 'getIiiiiiiii');
    component.iiiiiiiii = component.iiiiiiiii || {};
    component.iiiiiiiii = ['iiiiiiiii'];
    component.ngOnInit();
    // expect(component.getIiiiiiiii).toHaveBeenCalled();
  });

  it('should run #ngAfterViewInit()', () => {

    component.ngAfterViewInit();

  });

  it('should run #applyFilter()', () => {

    component.applyFilter({
      target: {
        value: {}
      }
    });

  });

  it('should run #getIiiiiiiii()', () => {
    component.serviceFive = component.serviceFive || {};
    spyOn(component.serviceFive, 'instant');
    component.getIiiiiiiii({
      error: {},
      filter: function() {
        return [
          {
            "tttIiii": {}
          }
        ];
      }
    });
    // expect(component.serviceFive.instant).toHaveBeenCalled();
  });

  it('should run #searchIiiiiiiii()', () => {

    component.searchIiiiiiiii({});

  });

  it('should run #tttSssIii()', () => {

    component.tttSssIii('tttIiii', 'param');

  });

});
