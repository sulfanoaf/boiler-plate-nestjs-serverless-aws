import { Test, TestingModule } from '@nestjs/testing';
import * as rxjsOperators from 'rxjs/operators';
import { LoggingInterceptor } from '.';

const mockExecutionContext = {
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({
      params: {},
      query: {},
      body: {},
      route: {
        path: '',
        methods: {},
      },
    }),
  }),
};

const mockCallHandler = {
  handle: jest.fn().mockReturnValue({
    pipe: jest.fn(),
  }),
};

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [LoggingInterceptor],
    }).compile();

    interceptor = testingModule.get<LoggingInterceptor>(LoggingInterceptor);
  });

  it('define', () => {
    expect(interceptor).toBeDefined();
  });

  it('interceptor', () => {
    const spyLog = jest
      .spyOn(global.console, 'log')
      .mockImplementationOnce(null);
    const spyRxjsOperators = jest.spyOn(rxjsOperators, 'tap');

    interceptor.intercept(mockExecutionContext as any, mockCallHandler);

    expect(spyLog).toHaveBeenCalled();
    expect(spyRxjsOperators).toHaveBeenCalled();
  });
});
