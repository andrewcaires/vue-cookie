import Vue, { PluginObject } from 'vue';

export interface VueCookieOptions {
  expires?: number;
}

export interface VueCookieAttributes {
  domain?: string;
  expires?: number;
  path?: string;
  secure?: boolean;
}

export type VueCookieElements = { [key: string]: string }

const DefaultOptions: VueCookieOptions = {

  expires: 86400,

};

class Cookie {

  private options: VueCookieOptions;

  constructor(options: VueCookieOptions) {

    this.options = { ...DefaultOptions, ...options };
  }

  all(): VueCookieElements {

    return document.cookie.split(';').map((cookie) => {

      return cookie.split('=').map(decodeURIComponent);

    }).reduce((cookies, [key, val]) => {

      return cookies[key.trim()] = val, cookies;

    }, {} as VueCookieElements);
  }

  check(name: string): boolean {

    const cookies = this.all();

    return !!cookies[name.trim()];
  }

  get(name: string): string | undefined {

    const cookies = this.all();

    return cookies[name.trim()] || undefined;
  }

  remove(name: string, options: VueCookieAttributes = {}): void {

    options.expires = -86400;

    this.set(name, '', options);
  }

  set(name: string, value: string, options: VueCookieAttributes = {}): void {

    document.cookie = this.encode(name, value) + ';' + this.attributes(options);
  }

  private attributes(options: VueCookieAttributes = {}): string {

    const { domain, expires, path, secure } = options;

    const attributes: Array<string> = [];

    if (domain) {

      attributes.push(this.domain(domain));
    }

    attributes.push(this.expires(expires));

    attributes.push(this.path(path));

    if (secure) {

      attributes.push('secure');
    }

    return attributes.join(';');
  }

  private domain(domain: string): string {

    return 'domain=' + domain;
  }

  private encode(name: string, value: string | number | boolean): string {

    return encodeURIComponent(name.trim()) + '=' + encodeURIComponent(value);
  }

  private expires(time?: number): string {

    const date = new Date();

    const expires = this.options.expires || 0;

    date.setTime(date.getTime() + ((time || expires) * 1000));

    return 'expires=' + date.toUTCString();
  }

  private path(path?: string): string {

    return 'path=' + (path ? path : '/');
  }
}

export const VueCookie: PluginObject<VueCookieOptions> = {

  install(vue: any, options: VueCookieOptions = {}): void {

    Vue.prototype.$cookie = new Cookie(options);
  }
};

declare module 'vue/types/vue' {
  interface Vue {
    $cookie: Cookie;
  }
}

export default VueCookie;
