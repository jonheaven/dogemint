// src/rpc/provider.ts

export type ProviderType = 'tatum' | 'local' | 'rpc';

export interface ProviderConfig {
  type: ProviderType;
  apiKey?: string;
  url?: string;
  auth?: { user: string; pass: string };
}

export class DogecoinProvider {
  private static _default: DogecoinProvider | null = null;

  static getDefault(): DogecoinProvider {
    if (!DogecoinProvider._default) {
      // Try to get config from localStorage (browser)
      let apiKey = '';
      if (typeof window !== 'undefined' && window.localStorage) {
        apiKey = window.localStorage.getItem('tatumApiKey') || '';
      }
      DogecoinProvider._default = new DogecoinProvider({ type: 'tatum', apiKey });
    }
    return DogecoinProvider._default;
  }
  private config: ProviderConfig;
  private tatumProvider?: any;

  constructor(config: ProviderConfig) {
    this.config = config;
    if (config.type === 'tatum' && config.apiKey) {
      // Lazy import to avoid circular deps if needed
      const { TatumDogecoinProvider } = require('./tatumProvider');
      this.tatumProvider = new TatumDogecoinProvider(config.apiKey);
    }
    // Add local/RPC setup as needed
  }

  async rpcCall(method: string, params: any[] = []) {
    if (this.config.type === 'tatum' && this.tatumProvider) {
      return await this.tatumProvider.rpcCall(method, params);
    }
    if (this.config.type === 'rpc' && this.config.url) {
      // Standard Dogecoin Core RPC
      const res = await fetch(this.config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(this.config.auth ? {
            'Authorization': 'Basic ' + btoa(`${this.config.auth.user}:${this.config.auth.pass}`)
          } : {}),
        },
        body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 }),
      });
      if (!res.ok) throw new Error(`RPC error: ${res.statusText}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      return data.result;
    }
    if (this.config.type === 'local') {
      // Implement local node logic here
      throw new Error('Local provider not implemented');
    }
    throw new Error('No valid provider configured');
  }

  // Example: getBlockCount
  async getBlockCount() {
    return await this.rpcCall('getblockcount');
  }

  // Add more methods as needed, delegating to rpcCall
}

// Usage:
// const provider = new DogecoinProvider({ type: 'tatum', apiKey: '...' });
// await provider.getBlockCount();
