import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { DynamicComponentService } from './example.service';
import { ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '@rogers/oneview-components';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockEncryptionService {
  decrypt = function() {};
}

describe('DynamicComponentService', () => {
  let service;

  beforeEach(() => {
    service = new DynamicComponentService({}, {}, {
        snapshot: {
          params: {
            'cipherText': {}
          }
        }
      }, {
        decrypt: function() {}
      });
  });

  it('should run #createComponent()', () => {
    service.factoryResolver = service.factoryResolver || {};
    spyOn(service.factoryResolver, 'resolveComponentFactory').and.returnValue({
      create: function() {}
    });
    service.createComponent({}, {}, {
      parentInjector: {}
    });
    // expect(service.factoryResolver.resolveComponentFactory).toHaveBeenCalled();
  });

  it('should run #insertComponent()', () => {
    service.rootViewContainer = service.rootViewContainer || {};
    spyOn(service.rootViewContainer, 'insert');
    service.insertComponent({
      location: {
        nativeElement: {
          setAttribute: function() {}
        }
      },
      instance: {
        id: {}
      },
      hostView: {}
    });
    // expect(service.rootViewContainer.insert).toHaveBeenCalled();
  });

  it('should run #emptyFunction()', () => {

    service.emptyFunction();

  });

});
