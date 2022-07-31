// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, LOCALE_ID } from '@angular/core';
import { Example2Component } from './example2.component';
import { FormBuilder } from '@angular/forms';

describe('Example2Component', () => {
  let fixture: ComponentFixture<Example2Component>;
  let component: Example2Component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        Example2Component,

      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: 'LOCALE_ID', useValue: 'en' }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Example2Component);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run SetterDeclaration #showFlow', () => {
    spyOn(component, 'getControlsAndCreateForm');
    component.showFlow = {};
    // expect(component.getControlsAndCreateForm).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #myData', () => {
    component.data = component.data || {};
    component.data.tooltip = {
      amount: 'amount',
      site: 'site'
    };
    component.data.location = {
      threshold: {},
      sites: {}
    };
    const myData = component.myData;

  });

  it('should run #ngOnInit()', () => {
    spyOn(component, 'createForm');
    component.ngOnInit();
    // expect(component.createForm).toHaveBeenCalled();
  });

  it('should run #createForm()', () => {
    spyOn(component, 'getControls');
    spyOn(component, 'getFormControls');
    spyOn(component, 'createForm');
    component.formBuilder = component.formBuilder || {};
    spyOn(component.formBuilder, 'group');
    spyOn(component, 'handleFoo');
    spyOn(component, 'handleBar');
    component.createForm({});
    // expect(component.getControls).toHaveBeenCalled();
    // expect(component.getFormControls).toHaveBeenCalled();
    // expect(component.createForm).toHaveBeenCalled();
    // expect(component.formBuilder.group).toHaveBeenCalled();
    // expect(component.handleFoo).toHaveBeenCalled();
    // expect(component.handleBar).toHaveBeenCalled();
  });

  it('should run #getFormControls()', () => {
    component.selectedType = component.selectedType || {};
    component.selectedType.code = 'code';
    spyOn(component, 'getControls');
    component.getFormControls();
    // expect(component.getControls).toHaveBeenCalled();
  });

  it('should run #getControls()', () => {
    component.formControlsKeys = component.formControlsKeys || {};
    component.formControlsKeys = ['formControlsKeys'];
    component.getControls();

  });

  it('should run #handleBar()', () => {
    component.data = component.data || {};
    component.data.location = {
      threshold: {}
    };
    component.myForm = component.myForm || {};
    spyOn(component.myForm, 'get').and.returnValue({
      valueChanges: observableOf({})
    });
    spyOn(component, 'isValid');
    spyOn(component, 'handleFoo');
    component.handleBar();
    // expect(component.myForm.get).toHaveBeenCalled();
    // expect(component.isValid).toHaveBeenCalled();
    // expect(component.handleFoo).toHaveBeenCalled();
  });

  it('should run #handleFoo()', () => {
    component.myForm = component.myForm || {};
    spyOn(component.myForm, 'get').and.returnValue({
      setValue: function() {},
      valueChanges: observableOf({})
    });
    component.details = component.details || {};
    component.details.content = {
      moreDetails: {
        plan: {}
      }
    };
    component.handleFoo();
    // expect(component.myForm.get).toHaveBeenCalled();
  });

  it('should run #getAmount()', () => {
    component.data = component.data || {};
    component.data.amount = 'amount';
    component.data.amount2 = 'amount2';
    component.selected = component.selected || {};
    component.selected.id = 'id';
    component.myForm = component.myForm || {};
    spyOn(component.myForm, 'get').and.returnValue({
      valid: {}
    });
    component.getAmount();
    // expect(component.myForm.get).toHaveBeenCalled();
  });

  it('should run #isFieldValid()', () => {

    component.isFieldValid({
      touched: {},
      valid: {}
    });

  });

  it('should run #isValid()', () => {
    spyOn(component, 'getAmount');
    component.isValid();
    // expect(component.getAmount).toHaveBeenCalled();
  });

  it('should run #submit()', () => {
    component.formSubmitted = component.formSubmitted || {};
    spyOn(component.formSubmitted, 'emit');
    component.myForm = component.myForm || {};
    component.myForm.value = 'value';
    component.submit();
    // expect(component.formSubmitted.emit).toHaveBeenCalled();
  });

});
