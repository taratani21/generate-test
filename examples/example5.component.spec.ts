// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ElementRef } from '@angular/core';
import { Example5Component } from './example5.component';
import { ServiceEight, ServiceSeven, ServivceSix, ServiceThree } from '@rogers/oneview-components';
import { ServiceTwelve } from '../twelve.service';
import { ServiceNine } from './nine.service';
import { ServiceTen } from './ten.service';
import { ServiceFourteen } from './fourteen.service';
import { ServiceEleven } from '../eleven.service';
import { ServiceFifteen } from '../fifteen.service';
import { ServiceThirteen } from './thirteen.service';

@Injectable()
class MockServiceTwelve {}

@Injectable()
class MockElementRef {
  nativeElement = {};
}

@Injectable()
class MockServiceNine {}

@Injectable()
class MockServiceTen {}

@Injectable()
class MockServiceFourteen {
  getServiceFourteen = function() {};
}

@Injectable()
class MockServiceEleven {}

@Injectable()
class MockServiceFifteen {}

@Injectable()
class MockServiceThirteen {}

describe('Example5Component', () => {
  let fixture: ComponentFixture<Example5Component>;
  let component: Example5Component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        Example5Component,

      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ServiceEight,
        ServiceSeven,
        ServivceSix,
        { provide: ServiceTwelve, useClass: MockServiceTwelve },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: ServiceNine, useClass: MockServiceNine },
        { provide: ServiceTen, useClass: MockServiceTen },
        { provide: ServiceFourteen, useClass: MockServiceFourteen },
        ServiceThree,
        { provide: ServiceEleven, useClass: MockServiceEleven },
        { provide: ServiceFifteen, useClass: MockServiceFifteen },
        { provide: ServiceThirteen, useClass: MockServiceThirteen }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Example5Component);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #isHhhAaa', () => {
    component.service8 = component.service8 || {};
    component.service8.bazInfo = {
      'consumer': {},
      authorizationLevel: {},
      authorozationLevel: 'authorozationLevel'
    };
    const isHhhAaa = component.isHhhAaa;

  });

  it('should run #ngOnInit()', () => {
    component.ssssMmmm = component.ssssMmmm || {};
    component.ssssMmmm.lob = 'lob';
    component.service9 = component.service9 || {};
    spyOn(component.service9, 'getdetails').and.returnValue(observableOf({}));
    spyOn(component.service9, 'getPostDatedPPC').and.returnValue(observableOf({}));
    spyOn(component.service9, 'getIiiiiiiii').and.returnValue(observableOf({}));
    spyOn(component.service9, 'getFooBar1Summary').and.returnValue(observableOf({}));
    spyOn(component.service9, 'getSssAaaLll');
    spyOn(component.service9, 'handleEeeDT');
    component.service12 = component.service12 || {};
    component.service12.getSssIiiiD = observableOf({});
    component.serviceSixteen = component.serviceSixteen || {};
    spyOn(component.serviceSixteen, 'getEeeDddSsss').and.returnValue({
      nnnPpp: {}
    });
    component.service15 = component.service15 || {};
    spyOn(component.service15, 'getTttAaa').and.returnValue(observableOf({
      ecid: {}
    }));
    spyOn(component.service15, 'getSD').and.returnValue(observableOf({}));
    component.ngOnInit();
    // expect(component.service9.getdetails).toHaveBeenCalled();
    // expect(component.service9.getPostDatedPPC).toHaveBeenCalled();
    // expect(component.service9.getIiiiiiiii).toHaveBeenCalled();
    // expect(component.service9.getFooBar1Summary).toHaveBeenCalled();
    // expect(component.service9.getSssAaaLll).toHaveBeenCalled();
    // expect(component.service9.handleEeeDT).toHaveBeenCalled();
    // expect(component.serviceSixteen.getEeeDddSsss).toHaveBeenCalled();
    // expect(component.service15.getTttAaa).toHaveBeenCalled();
    // expect(component.service15.getSD).toHaveBeenCalled();
  });

  it('should run #updateHanoi()', () => {
    component.fffCccDddd = component.fffCccDddd || {};
    component.fffCccDddd.nativeElement = {
      offsetHeight: {}
    };
    component.myFooList = component.myFooList || {};
    component.myFooList.nativeElement = {
      style: {
        height: {}
      }
    };
    component.fooList1 = component.fooList1 || {};
    component.fooList1.nativeElement = {
      style: {
        height: {}
      }
    };
    component.updateHanoi({});

  });

  it('should run #openSsMmD()', () => {
    component.ServiceThree = component.ServiceThree || {};
    spyOn(component.ServiceThree, 'open');
    component.openSsMmD({});
    // expect(component.ServiceThree.open).toHaveBeenCalled();
  });

  it('should run #startFfPp()', async () => {
    component.service8 = component.service8 || {};
    component.service8.bazInfo = {
      fooOneCode: {}
    };
    component.service6 = component.service6 || {};
    spyOn(component.service6, 'isFooDone');
    component.ServiceThree = component.ServiceThree || {};
    spyOn(component.ServiceThree, 'open').and.returnValue({
      fooOneCodeChange$: observableOf({})
    });
    component.service13 = component.service13 || {};
    spyOn(component.service13, 'checkFfCuI');
    component.component3 = component.component3 || {};
    spyOn(component.component3, 'changePlPr');
    await component.startFfPp({});
    // expect(component.service6.isFooDone).toHaveBeenCalled();
    // expect(component.ServiceThree.open).toHaveBeenCalled();
    // expect(component.service13.checkFfCuI).toHaveBeenCalled();
    // expect(component.component3.changePlPr).toHaveBeenCalled();
  });

  it('should run #handleFlBu()', async () => {
    component.service8 = component.service8 || {};
    component.service8.bazInfo = {
      fooOneCode: {}
    };
    component.service8.ssssMmmm = {
      nnnAaaa: {}
    };
    component.service6 = component.service6 || {};
    spyOn(component.service6, 'isFooDone');
    component.ServiceThree = component.ServiceThree || {};
    spyOn(component.ServiceThree, 'open').and.returnValue({
      fooOneCodeChange$: observableOf({})
    });
    component.service10 = component.service10 || {};
    spyOn(component.service10, 'handleFooCodeChange');
    spyOn(component.service10, 'checkTyEl');
    spyOn(component.service10, 'upgradeDwHa');
    await component.handleFlBu({
      detail: {
        ccc: {}
      }
    });
    // expect(component.service6.isFooDone).toHaveBeenCalled();
    // expect(component.ServiceThree.open).toHaveBeenCalled();
    // expect(component.service10.handleFooCodeChange).toHaveBeenCalled();
    // expect(component.service10.checkTyEl).toHaveBeenCalled();
    // expect(component.service10.upgradeDwHa).toHaveBeenCalled();
  });

  it('should run #goIgTTo()', () => {
    component.el = component.el || {};
    component.el.nativeElement = {
      dispatchEvent: function() {}
    };
    component.goIgTTo({});

  });

});
