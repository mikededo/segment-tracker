const getMock = jest.fn().mockImplementationOnce((fn) => fn);
const virtualMock = jest
  .fn()
  .mockImplementationOnce((name: string) => ({ get: getMock }));

// Function that mocks mongoose implementation
jest.mock('mongoose', () => ({
  Schema: jest.fn().mockImplementation((definition: any, options: any) => ({
    constructor: jest.fn(),
    virtual: virtualMock,
    pre: jest.fn(),
    set: jest.fn(),
    methods: { comparePassword: jest.fn() },
    comparePassword: jest.fn(),
  })),
  SchemaTypes: jest.fn().mockImplementation(() => ({
    String: jest.fn(),
  })),
}));

// Add imports after, to avoid ReferenceError
import { hash } from 'bcrypt';
import { anyFunction } from 'jest-mock-extended';
import {
  beforeSave,
  comparePassword,
  userNameHook,
  UserSchema,
} from './user.model';

describe('UserSchema', () => {
  it('should call Schema.virtual', () => {
    expect(UserSchema).toBeDefined();

    expect(getMock).toBeCalled();
    expect(getMock).toBeCalledWith(anyFunction());
    expect(virtualMock).toBeCalled();
    expect(virtualMock).toHaveBeenNthCalledWith(1, 'name');
    expect(virtualMock).toBeCalledTimes(1);
  });
});

// Test before save hook
describe('beforeSave', () => {
  test('should execute next middleware when password has not changed', async () => {
    const mockNext = jest.fn();
    const mockCtx = { isModified: jest.fn() };

    mockCtx.isModified.mockReturnValueOnce(false);
    await beforeSave.call(mockCtx, mockNext);

    expect(mockCtx.isModified).toBeCalledWith('password');
    expect(mockNext).toBeCalledTimes(1);
  });

  test('should set password when password is modified', async () => {
    const mockNext = jest.fn();
    const mockCtx = {
      isModified: jest.fn(),
      set: jest.fn(),
      password: '123456',
    };

    mockCtx.isModified.mockReturnValueOnce(true);
    await beforeSave.call(mockCtx, mockNext);

    expect(mockCtx.isModified).toBeCalledWith('password');
    expect(mockNext).toBeCalledTimes(1);
    expect(mockCtx.set).toBeCalledTimes(1);
  });
});

describe('getName', () => {
  it('should compute the first and last name of a user', async () => {
    const mockCtx = {
      firstName: 'Jest',
      lastName: 'Test',
    };
    const res = await userNameHook.call(mockCtx);

    expect(res).toBe('Jest Test');
  });
});

describe('encriptedPasswordComparison', () => {
  const pwd = '123456';
  const diffPwd = '000000';

  test('should return true if passwords are matched', async () => {
    const hashed = await hash(pwd, 10);
    const ctxMock = { password: hashed };

    const res = await comparePassword.call(ctxMock, pwd).toPromise();
    expect(res).toBeTruthy();
  });

  test('should return false if passwords are not matched', async () => {
    const hashed = await hash(pwd, 10);
    const ctxMock = { password: hashed };

    const res = await comparePassword.call(ctxMock, diffPwd).toPromise();
    expect(res).toBeFalsy();
  });
});
