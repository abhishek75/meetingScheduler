import { DashboardModule } from '@app/dashboard-home/dashboard-home.module';

describe('DashboardModule', () => {
  let DashboardModul: DashboardModule;

  beforeEach(() => {
    DashboardModul = new DashboardModule();
  });

  it('should create an instance', () => {
    expect(DashboardModule).toBeTruthy();
  });
});
