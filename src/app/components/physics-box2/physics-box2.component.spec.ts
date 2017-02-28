/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhysicsBox2Component } from './physics-box2.component';

describe('PhysicsBox2Component', () => {
  let component: PhysicsBox2Component;
  let fixture: ComponentFixture<PhysicsBox2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicsBox2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsBox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
