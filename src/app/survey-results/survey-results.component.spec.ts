import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultsComponent } from './survey-results.component';

describe('SurveyResultsComponent', () => {
  let component: SurveyResultsComponent;
  let fixture: ComponentFixture<SurveyResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
