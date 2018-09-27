import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionComponent } from './survey-question.component';

describe('QuestionComponent', () => {
  let component: SurveyQuestionComponent;
  let fixture: ComponentFixture<SurveyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
