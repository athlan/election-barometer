import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: SurveyService = TestBed.get(SurveyService);
    expect(service).toBeTruthy();
  });
});
