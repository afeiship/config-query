import Config from '../src';

const local_configs = [
  {
    school_level: 'graduate',
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
  {
    school_level: 'graduate',
    language: 'en-US',
    key: 'gender',
    value: [
      { label: 'Gender', value: 'male' },
      { label: 'Gender', value: 'female' },
    ],
  },
  {
    school_level: 'graduate',
    language: null,
    key: 'test',
    value: [
      { label: 'Test', value: 'test' },
    ],
  },
];

describe('api.basic', () => {
  test('01/Should create a new instance of Config', () => {
    const config = new Config(local_configs);
    expect(config).toBeInstanceOf(Config);
  });

  test('02/select should get list of values of the specified key', () => {
    const config = new Config(local_configs);
    expect(config.select({ key: 'yes_or_no', language: 'zh-CN' })).toEqual([local_configs[0]]);
    expect(config.select({ key: 'yes_or_no' })).toEqual([local_configs[0], local_configs[1]]);
    expect(config.select({ key: 'gender' })).toEqual([local_configs[2]]);
  });

  test('03/select with dynamicFilters/select should override the default dynamicFilters', () => {
    const config = new Config(local_configs, { dynamicFilters: { school_level: 'graduate', language: () => 'zh-CN' } });
    expect(config.select({ key: 'yes_or_no' })).toEqual([local_configs[0]]);
    expect(config.select({ key: 'yes_or_no', language: 'en-US' })).toEqual([local_configs[1]]);
  });

  test('04/get one', () => {
    const config = new Config(local_configs);
    expect(config.find({ key: 'yes_or_no', language: 'zh-CN' })).toEqual(local_configs[0]);
    expect(config.find({ key: 'yes_or_no', language: 'en-US' })).toEqual(local_configs[1]);
    expect(config.find({ key: 'gender', language: 'zh-Tw' })).toEqual(null);
  });

  test('05/directly find value', () => {
    const config = new Config(local_configs);
    expect(config.value({ key: 'yes_or_no', language: 'zh-CN' })).toEqual(local_configs[0].value);
    expect(config.value({ key: 'yes_or_no', language: 'en-US' })).toEqual(local_configs[1].value);
    expect(config.value({ key: 'gender', language: 'zh-Tw' })).toEqual(null);
  });

  test('06/find test key with any language', () => {
    const config = new Config(local_configs);
    expect(config.find({ key: 'test', language: 'zh-CN' })).toEqual(local_configs[3]);
    expect(config.find({ key: 'test', language: 'en-US' })).toEqual(local_configs[3]);
    expect(config.find({ key: 'test'})).toEqual(local_configs[3]);
  });
});
