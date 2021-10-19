import Vue from 'vue';

export interface VueCookieOptions {
  domain?: string;
  expires?: number;
  path?: string;
  secure?: boolean;
}

export type VueCookieElements = { [key: string]: string }

const DefaultOptions: VueCookieOptions = {

  expires: 86400,

};

let installed = false;

export class VueCookie {

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

  remove(name: string, options: VueCookieOptions = {}): void {

    options.expires = -86400;

    this.set(name, '', options);
  }

  set(name: string, value: string, options: VueCookieOptions = {}): void {

    document.cookie = this.encode(name, value) + ';' + this.attributes(options);
  }

  private attributes(options: VueCookieOptions = {}): string {

    const { domain, expires, path, secure } = { ...this.options, ...options };

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

  private expires(expires?: number): string {

    const date = new Date();

    date.setTime(date.getTime() + ((expires || 0) * 1000));

    return 'expires=' + date.toUTCString();
  }

  private path(path?: string): string {

    return 'path=' + (path ? path : '/');
  }

  static install(vue: any, options: VueCookieOptions = {}): void {

    if (installed) { return; } else { installed = true; }

    Vue.$cookie = new VueCookie(options);
    Vue.prototype.$cookie = Vue.$cookie;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $cookie: VueCookie;
  }
  interface VueConstructor {
    $cookie: VueCookie;
  }
}

export default VueCookie;
