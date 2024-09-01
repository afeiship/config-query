# config-query
> A flexible library for dynamic queries on configuration objects with customizable filters.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/config-query
```

## usage
```js
import ConfigQuery from '@jswork/config-query';

const configs = [
  {
    school_level: null,
    language: "zh-CN",
    key: "yes_or_no",
    value: [
      { label: "是", value: "yes" },
      { label: "否", value: "no" },
    ],
  },
  {
    school_level: null,
    language: "en-US",
    key: "yes_or_no",
    value: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
];

const query = new ConfigQuery(configs);

// gets
const yes_no_items = query.gets({ key: "yes_or_no" });
console.log(yes_no_items);


/** output:
 *  [
 *    {
 *      "school_level": null,
 *      "language": "zh-CN",
 *      "key": "yes_or_no",
 *      "value": [
 *        { "label": "是", "value": "yes" },
 *        { "label": "否", "value": "no" }
 *      ]
 *    },
 *    {
 *      "school_level": null,
 *      "language": "en-US",
 *      "key": "yes_or_no",
 *      "value": [
 *        { "label": "Yes", "value": "yes" },
 *        { "label": "No", "value": "no" }
 *      ]
 *    }
 *  ]
 */

// get by language
const en = query.get({ language: "en-US" });
console.log(en);

/** output:
 *   {
 *     "school_level": null,
 *     "language": "en-US",
 *     "key": "yes_or_no",
 *     "value": [
 *       { "label": "Yes", "value": "yes" },
 *       { "label": "No", "value": "no" }
 *     ]
 *   }
 */

// value filter
const yes = query.value({ key: "yes_or_no", "language": "zh-CN" });
console.log(yes);


/** output:
 *  [ 
 *    { "label": "是", "value": "yes" },
 *    { "label": "否", "value": "no" }
 *  ]
 */
```

## license
Code released under [the MIT license](https://github.com/afeiship/config-query/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/config-query
[version-url]: https://npmjs.org/package/@jswork/config-query

[license-image]: https://img.shields.io/npm/l/@jswork/config-query
[license-url]: https://github.com/afeiship/config-query/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/config-query
[size-url]: https://github.com/afeiship/config-query/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/config-query
[download-url]: https://www.npmjs.com/package/@jswork/config-query
