import { baseSerializer } from './helpers';

describe('BaseSerializer', () => {
  it('should remove the _id prop of an object', () => {
    const shcemaMock = { _id: '12346' };

    const res = baseSerializer(null, shcemaMock);

    expect(res).toBeDefined();
    expect(res._id).toBeUndefined();
  });
});
