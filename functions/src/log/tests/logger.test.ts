import { Logger } from "..";
import { InvocationContext } from "@azure/functions";

jest.mock('@azure/functions');
jest.mock('@azure/functions', () => ({
  InvocationContext:
    jest.fn(() => {
      return {
        error: (...args: any[]) => { },
        log: (...args: any[]) => { }
      }
    })
}));

it('should instantiate Logger ', async () => {
  const logger = new Logger(new InvocationContext());
  expect(logger).toBeDefined()
});

it('Use information log level to write log', async () => {
  const logger = new Logger(new InvocationContext());
  expect(logger).toBeDefined();
  logger.log('info')
});

it('Use error log level to write log', async () => {
  const logger = new Logger(new InvocationContext());
  expect(logger).toBeDefined();
  logger.error('error')
});
