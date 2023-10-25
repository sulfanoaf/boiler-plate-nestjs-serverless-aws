import { DataSource } from 'typeorm';

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    createQueryRunner: jest.fn().mockReturnValue({
      connect: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      startTransaction: jest.fn(),
      manager: {
        save: jest.fn(),
        update: jest.fn(),
      },
    }),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};
