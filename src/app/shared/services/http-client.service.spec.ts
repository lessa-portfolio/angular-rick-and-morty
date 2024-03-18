import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injector } from '@angular/core';

class ResourceTest {
  constructor(public id: string, public name: string) {}

  static fromJson(jsonData: any): ResourceTest {
    return new ResourceTest(jsonData.id, jsonData.name);
  }
}

class HttpClientServiceMock extends HttpClientService<ResourceTest> {
  constructor(protected override injector: Injector) {
    super('', injector, ResourceTest.fromJson);
  }

  public getResourceForTest(options?: any) {
    return this.getResource(options);
  }
}

describe('HttpClientService', () => {
  let service: HttpClientServiceMock;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClientServiceMock,
        { provide: Injector, useValue: TestBed.inject(Injector) },
      ],
    });
    service = TestBed.inject(HttpClientServiceMock);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('should get resource from API', () => {
    const mockData: ResourceTest = { id: '1', name: 'Test Resource' };

    service.getResourceForTest().subscribe((resource) => {
      expect(resource).toEqual(mockData);
    });

    const req = httpMock.expectOne('apiPath');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle HTTP errors', () => {
    const mockError = new ErrorEvent('Network error', {
      message: 'Failed to connect to server',
    });

    service.getResourceForTest().subscribe({
      error: (error) => {
        expect(error.message).toEqual('Please try again later.');
      },
    });

    const req = httpMock.expectOne('apiPath');
    req.error(mockError, { status: 500, statusText: 'Internal Server Error' });
  });
});
