import { TestBed } from '@angular/core/testing';

import { UserworkService } from './userwork.service';

describe('UserworkService', () => {
  let service: UserworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
