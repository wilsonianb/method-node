import Resource, { IResourceError } from '../../resource';
import Configuration from '../../configuration';
import { IAccount } from '../Account';

export const ConnectionSources = {
  plaid: 'plaid',
  mch_5500: 'mch_5500',
};

export type TConnectionSources =
  | 'plaid'
  | 'mch_5500';


export interface IConnection {
  id: string;
  entity_id: string;
  accounts: string[];
  source: string;
  status: TConnectionSources
  error: IResourceError | null;
  created_at: string;
  updated_at: string;
  last_synced_at: string;
}

export interface IConnectionUpdateOpts {
  status: 'syncing';
}

export default class Connection extends Resource<void> {
  constructor(config: Configuration) {
    super(config.addPath('connections'));
  }

  async list() {
    return super._list<IConnection>();
  }

  async get(id: string) {
    return super._getWithId<IConnection>(id);
  }

  async update(id: string, opts: IConnectionUpdateOpts) {
    return super._updateWithId<IConnection, IConnectionUpdateOpts>(id, opts);
  }

  async getAccounts(id: string) {
    return super._getWithSubPath<IAccount[]>(`/${id}/accounts`);
  }

  async getPublicAccountTokens(id: string) {
    return super._getWithSubPath<string[]>(`/${id}/public_account_tokens`);
  }
};
