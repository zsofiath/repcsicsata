import { flush, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PreparationService } from './preparation.service';
import { HttpClientModule } from '@angular/common/http';
import Plane from '../model/Plane';
import MockPlane from 'src/testMocks/MockPlane';


describe('PreparationService', () => {

 let service: PreparationService, httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
    ],
    });

    service = TestBed.get(PreparationService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the prepared planes', () => {
    service.sendPlanes([new MockPlane(), new MockPlane()]).subscribe(res =>{
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/place-planes');

    expect(req.request.method).toBe('POST');
    expect(req.request.body.planes.length).toEqual(2);

    req.flush(10);
  });
});
