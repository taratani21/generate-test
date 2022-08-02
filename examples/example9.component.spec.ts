import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TotalDataDetailsComponent } from './example9.component';
import { ServiceFive } from '@ngx-serviceFive/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataManagerService } from '../data-manager.service';
import { EncryptionService } from '@rogers/oneview-components';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockDataManagerService {}

@Injectable()
class MockEncryptionService {
  decrypt = function() {};
}

describe('TotalDataDetailsComponent', () => {
  let fixture: ComponentFixture<TotalDataDetailsComponent>;
  let component: any;

  let serviceFive: ServiceFive;
  let mockHttpClient: MockHttpClient;
  let mockDataManagerService: MockDataManagerService;
  let mockEncryptionService: MockEncryptionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        TotalDataDetailsComponent,

      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ServiceFive,
        { provide: HttpClient, useClass: MockHttpClient },
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
        { provide: DataManagerService, useClass: MockDataManagerService },
        { provide: EncryptionService, useClass: MockEncryptionService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TotalDataDetailsComponent);
    component = fixture.componentInstance;

    serviceFive = TestBed.inject(ServiceFive);
    mockHttpClient = TestBed.inject(HttpClient);
    mockDataManagerService = TestBed.inject(DataManagerService);
    mockEncryptionService = TestBed.inject(EncryptionService);
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    component.ssssMmmm = component.ssssMmmm || {};
    component.ssssMmmm.subList = [
      {
        "shareEverything": {
          "isSharingData": {}
        }
      }
    ];
    component.service8 = component.service8 || {};
    component.service8.ssssMmmm = {
      subList: [{
        shareEverything: {
          isPrimaryccc: {}
        },
        numSxFoo: {}
      }]
    };
    spyOn(component, 'getPastUsage1').and.returnValue({
      cccDataUsed: {},
      dates: {}
    });
    spyOn(component, 'getPastUsage2').and.returnValue([
      "cccDataUsed2",
      "dates2"
    ]);
    spyOn(component, 'getPastUsage3');
    component.ngOnInit();
    // expect(component.getPastUsage1).toHaveBeenCalled();
    // expect(component.getPastUsage2).toHaveBeenCalled();
    // expect(component.getPastUsage3).toHaveBeenCalled();
  });

  it('should run #getPrimaryccc()', () => {
    component.service8 = component.service8 || {};
    component.service8.ssssMmmm = {
      subList: [{
        shareEverything: {
          isPrimaryccc: {}
        },
        numSxFoo: {}
      }]
    };
    component.getPrimaryccc({
      featureGroupList: observableOf({
        featureGroup: {
          label: {
            en: {}
          }
        }
      })
    });

  });

  it('should run #openErrorserviceThree()', () => {
    component.serviceThree = component.serviceThree || {};
    spyOn(component.serviceThree, 'open').and.returnValue({
      serviceThreeOutput: {}
    });
    spyOn(mockServiceFive, 'instant');
    component.openErrorserviceThree({}, {});
    // expect(component.serviceThree.open).toHaveBeenCalled();
    // expect(mockServiceFive.instant).toHaveBeenCalled();
  });

  it('should run #getWirelessDetails()', () => {
    spyOn(component, 'getPostPaidDetails');
    spyOn(component, 'getCurrentSubsidy');
    component.getWirelessDetails();
    // expect(component.getPostPaidDetails).toHaveBeenCalled();
    // expect(component.getCurrentSubsidy).toHaveBeenCalled();
  });

  it('should run #getBonusDataListForSharing()', () => {
    component.data = component.data || {};
    component.data.ccc = 'ccc';
    component.getBonusDataListForSharing({}, {
      data: {
        secccList: [{}]
      }
    });

  });

  it('should run #getPastUsage()', () => {

    component.getPastUsage([{
      shared_bundles: {
        shared_bundle: [{}]
      },
      issue_date: {}
    }], {});

  });

  it('should run #funcParamAsArray()', () => {

    component.funcParamAsArray([{
      foo: {
        bar: {
          baz: {}
        }
      }
    }, {
      a: {
        b: {
          c: {}
        }
      }
    }]);

  });

  it('should run #funcParamAsObject()', () => {

    component.funcParamAsObject(observableOf({
      param3: {
        foo: {
          bar: {
            baz: {}
          }
        }
      },
      param4: {
        a: {
          b: {
            c: {}
          }
        }
      }
    }));

  });

  it('should run #funcParamAsCombined()', () => {

    component.funcParamAsCombined(observableOf({
      foo: {
        bar: {
          baz: {}
        }
      }
    }, {
      a: {
        b: {
          c: {}
        }
      }
    }, {
      param3: {
        x: {
          y: {
            z: {}
          }
        }
      },
      param4: {
        one: {
          two: {
            three: {}
          }
        }
      }
    }));

  });

});
