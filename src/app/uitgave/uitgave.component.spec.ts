import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UitgaveComponent } from './uitgave.component';

describe('UitgaveComponent', () => {
  let component: UitgaveComponent;
  let fixture: ComponentFixture<UitgaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UitgaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UitgaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
