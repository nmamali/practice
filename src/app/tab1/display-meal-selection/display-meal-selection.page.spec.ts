import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMealSelectionPage } from './display-meal-selection.page';

describe('DisplayMealSelectionPage', () => {
  let component: DisplayMealSelectionPage;
  let fixture: ComponentFixture<DisplayMealSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMealSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMealSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
