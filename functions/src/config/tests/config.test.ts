import { graphConfig, mongoConfig } from "..";

jest.mock('@azure/keyvault-secrets', () => ({
  SecretClient:
    jest.fn(() => {
      return {
        getSecret: () => {
          return {
            value: 'secret'
          }
        }
      }
    })
}));

const backup = process.env;

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  process.env = backup;
});

test('get graph config for a local environment', async () => {
  process.env = {
    ...backup,
    isLocal: 'true'
  };
  const config = await graphConfig();
  expect(config).toBeDefined();
});

test('get graph config for a non-local environment', async () => {
  process.env = {
    ...backup,
    kvUrl: ' '
  };
  const config = await graphConfig();
  expect(config).toBeDefined();
});

test('get mongo config for a local environment', async () => {
  process.env = {
    ...backup,
    isLocal: 'true'
  };
  const config = await mongoConfig();
  expect(config).toBeDefined();
});

test('get graph config for a non-local environment', async () => {
  process.env = {
    ...backup,
    kvUrl: ' '
  };
  const config = await mongoConfig();
  expect(config).toBeDefined();
});