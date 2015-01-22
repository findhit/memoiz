# memoiz

[![Test Status](http://strider.findhit.com/findhit/memoiz/badge)](http://strider.findhit.com/findhit/memoiz) [![Dependency Status](https://david-dm.org/findhit/memoiz.svg)](https://david-dm.org/findhit/memoiz)

Node.js / javascript module to cache method's return value

## Installation

```bash
npm install --save memoiz
```

## Usage

```js

var Memoiz = require( 'memoiz' );

var sum = Memoiz.method(function ( a, b ) {
    return a + b;
});

// First run will trigger a cache set
sum( 1, 2 ); // 3

// Second run will trigger a cache get
// without running provided method
sum( 1, 2 ); // 3

```

## Future features

In the future we should add:
* Abillity to detect uniqueness on arguments to cache specific responses (at the
    time it is caching only one result);
* Different kinds of stores;
