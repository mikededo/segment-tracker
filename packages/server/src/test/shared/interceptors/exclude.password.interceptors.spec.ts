import { ExcludePasswordInterceptor } from '@shared/interceptors/exclude.password.interceptor';

describe('AaInterceptor', () => {
  it('should be defined', () => {
    expect(new ExcludePasswordInterceptor()).toBeDefined();
  });
});
