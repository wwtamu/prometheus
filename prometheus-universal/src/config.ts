import { OpaqueToken } from '@angular/core';

export interface GlobalConfig {
  AUTH: {
    LOGIN: string,
    REFRESH: string,
    VERIFY: string,
    REGISTER: string,
    ADMIN: {
      ACCOUNT: {
        ALL: string,
        EMAIL: string
      },
      USER: {
        ALL: string,
        USERNAME: string
      },
      APPLICATION: {
        ALL: string,
        NAME: string
      }
    },
    DEFAULT: {
      USERNAME: string
    }
  },
  DAM: {
    USER: string,
    SIDEBAR: string
  },
  FORM: {
    REFRESH: string,
    VERIFY: string,
    REGISTER: string,
    LOGIN: string,
    USER: string,
    SIDECARD: string,
    SIDECARDLINK: string,
    SIDECARDACTION: string
  }
}

const SERVICES: any = {
  AUTH: 'http://localhost:9000',
  DAM: 'http://localhost:9001'
}

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = {
  AUTH: {
    LOGIN: SERVICES.AUTH + '/auth/token',
    REFRESH: SERVICES.AUTH + '/auth/refresh',
    VERIFY: SERVICES.AUTH + '/auth/verify',
    REGISTER: SERVICES.AUTH + '/auth/register',
    ADMIN: {
      ACCOUNT: {
        ALL: SERVICES.AUTH + '/account/all',
        EMAIL: SERVICES.AUTH + '/account'
      },
      USER: {
        ALL: SERVICES.AUTH + '/user/all',
        USERNAME: SERVICES.AUTH + '/user'
      },
      APPLICATION: {
        ALL: SERVICES.AUTH + '/application/all',
        NAME: SERVICES.AUTH + '/application'
      }
    },
    DEFAULT: {
      USERNAME: 'default'
    }
  },
  DAM: {
    USER: SERVICES.DAM + '/auth/user',
    SIDEBAR: SERVICES.DAM + '/sidebar'
  },
  FORM: {
    LOGIN: SERVICES.AUTH + '/form/token',
    REFRESH: SERVICES.AUTH + '/form/refresh',
    VERIFY: SERVICES.AUTH + '/form/verify',
    REGISTER: SERVICES.AUTH + '/form/register',
    USER: SERVICES.DAM + '/form/user',
    SIDECARD: SERVICES.DAM + '/form/sidecard',
    SIDECARDLINK: SERVICES.DAM + '/form/sidecard/link',
    SIDECARDACTION: SERVICES.DAM + '/form/sidecard/action'
  }
};

export let GLOBAL_CONFIG = new OpaqueToken('config');
