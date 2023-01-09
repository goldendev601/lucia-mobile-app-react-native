import { authInitialState } from './authReducer';
import { appInitialState } from './appReducer';
import { accountInitialState } from './accountReducer';
import { commonInitialState } from './commonReducer';
import { luciaAppInitialState } from './luciaAppReducer';

export interface IRootState {
  auth: typeof authInitialState;
  app: typeof appInitialState;
  account: typeof accountInitialState;
  common: typeof commonInitialState;
  luciaApp: typeof luciaAppInitialState;
}

export * from './appReducer';
export * from './authReducer';
export * from './accountReducer';
export * from './commonReducer';
export * from './luciaAppReducer';
