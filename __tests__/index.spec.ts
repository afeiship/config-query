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
];

describe('api.basic', () => {
  test('01/Should create a new instance of Config', () => {
    const config = new Config(local_configs);
    expect(config).toBeInstanceOf(Config);
  });

  test('02/gets should get list of values of the specified key', () => {
    const config = new Config(local_configs);
    expect(config.gets({ key: 'yes_or_no', language: 'zh-CN' })).toEqual([local_configs[0]]);
    expect(config.gets({ key: 'yes_or_no' })).toEqual([local_configs[0], local_configs[1]]);
    expect(config.gets({ key: 'gender' })).toEqual([local_configs[2]]);
  });

  test('03/gets with dynamicFilters/select should override the default dynamicFilters', () => {
    const config = new Config(local_configs, { dynamicFilters: { school_level: 'graduate', language: () => 'zh-CN' } });
    expect(config.gets({ key: 'yes_or_no' })).toEqual([local_configs[0]]);
    expect(config.gets({ key: 'yes_or_no', language: 'en-US' })).toEqual([local_configs[1]]);
  });

  test('04/get one', () => {
    const config = new Config(local_configs);
    expect(config.get({ key: 'yes_or_no', language: 'zh-CN' })).toEqual(local_configs[0]);
    expect(config.get({ key: 'yes_or_no', language: 'en-US' })).toEqual(local_configs[1]);
    expect(config.get({ key: 'gender', language: 'zh-Tw' })).toEqual(null);
  })

  test('05/directly get value',()=>{
    const config = new Config(local_configs);
    expect(config.value({ key: 'yes_or_no', language: 'zh-CN' })).toEqual(local_configs[0].value);
    expect(config.value({ key: 'yes_or_no', language: 'en-US' })).toEqual(local_configs[1].value);
    expect(config.value({ key: 'gender', language: 'zh-Tw' })).toEqual(null);
  })
});
