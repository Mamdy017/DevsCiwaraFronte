import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { AvenirPage } from './avenir.page';

describe('AvenirPage', () => {
  let component: AvenirPage;
  let fixture: ComponentFixture<AvenirPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvenirPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvenirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
