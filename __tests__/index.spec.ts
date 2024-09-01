import Config from '../src';

const local_configs = [
  {
    school_level: null,
    language: 'zh-CN',
    key: 'yes_or_no',
    value: [
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' },
    ],
  },
  {
    school_level: 'graduate',
    language: 'en-US',
    key: 'yes_or_no',
    value: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
];

describe('api.basic', () => {
  test('01/Should create a new instance of Config', () => {
    const config = new Config(local_configs, { fields: ['language', 'school_level'] });
    expect(config).toBeInstanceOf(Config);
  });

  test('02/get should return the value of the specified key', () => {
    const config = new Config(local_configs, { fields: ['language', 'school_level'] });
    expect(config.get({ key: 'yes_or_no', language: 'zh-CN' })).toEqual(local_configs[0]);
    expect(config.get({ key: 'yes_or_no', language: 'en-US' })).toEqual(local_configs[1]);
  });

  test('03/gets should get list of values of the specified key', () => {
    const config = new Config(local_configs, { fields: ['language', 'school_level'] });
    expect(config.gets({ key: 'yes_or_no', language: 'zh-CN' })).toEqual([local_configs[0]]);
    expect(config.gets({ key: 'yes_or_no'})).toEqual(local_configs);
  });
});
