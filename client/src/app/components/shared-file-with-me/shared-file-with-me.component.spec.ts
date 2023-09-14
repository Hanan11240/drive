import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileWithMeComponent } from './shared-file-with-me.component';

describe('SharedFileWithMeComponent', () => {
  let component: SharedFileWithMeComponent;
  let fixture: ComponentFixture<SharedFileWithMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedFileWithMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFileWithMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
