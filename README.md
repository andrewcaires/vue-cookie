# vue-cookie

VueJS plugin for HTTP cookie

## Installation

`npm i @andrewcaires/vue-cookie`

## Usage

```js
import VueCookie from '@andrewcaires/vue-cookie';
import Vue from 'vue';

Vue.use(VueCookie, {
  domain: '',
  expires: 86400, // value in milliseconds
  path: '/',
  secure: false,
});

Vue.$cookie.set('token', '...');
const token = Vue.$cookie.get('token');

// OR

export default Vue.extend({
  ...
  created: {
    show() {
      this.$cookie.set('token', '...');
      const token = this.$cookie.get('token');
    }
  },
  ...
});
```

## Api

- `all` Get all cookies

```js
const cookies = this.$cookie.all();
```

- `check` Check if a cookie exists

```js
const exists = this.$cookie.check('token');
```

- `get` Get a cookie

```js
const token = this.$cookie.get('token');
```

- `remove` Remove a cookie

```js
this.$cookie.remove('token');
```

- `set` Set a cookie

```js
this.$cookie.set('token', '...');

this.$cookie.set('token', {
  domain: '',
  expires: 86400,
  path: '/',
  secure: false,
});
```

### Links

*  [Docs](https://github.com/andrewcaires/vue-cookie#readme)
*  [GitHub](https://github.com/andrewcaires/vue-cookie)
*  [npm](https://www.npmjs.com/package/@andrewcaires/vue-cookie)

## License

*  [MIT](https://github.com/andrewcaires/vue-cookie/blob/main/LICENSE)
