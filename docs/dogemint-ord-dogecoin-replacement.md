# Dogemint: Replacing ord-dogecoin for Minting

## Objective
Enable Dogemint to fully replace ord-dogecoin for all minting, inscription, and wallet operations, so dApp developers never need ord-dogecoin again (assuming external indexers/explorers are available).

## What ord-dogecoin Provided
- Inscription creation and transaction building for Doginals
- Wallet management and signing
- CLI tools for minting and batch operations
- Chain indexing and explorer features (not needed in frontend)

## What Dogemint Will Provide
- All minting and inscription logic as modular, frontend-friendly APIs
- Transaction building, signing, and broadcasting via RPC/API
- Wallet management (address, UTXO, balance, signing)
- Batch inscription support
- No chain indexing or explorer logic (rely on external services)

## Migration Plan
1. **Extract all minting, inscription, and wallet logic from ord-dogecoin**
   - Refactor as TypeScript modules in Dogemint
   - Ensure feature parity for all minting operations
2. **Abstract all blockchain interactions**
   - Use RPC/API for transaction and wallet ops
   - Remove any backend/indexer dependencies
3. **Document APIs and migration steps**
   - Provide guides for dApp developers to switch from ord-dogecoin CLI/tools to Dogemint
4. **Test with external indexers/explorers**
   - Validate that all required data for dApps can be sourced externally
   - Ensure Dogemint only needs indexers for read operations, not minting

## What Can Be Deleted
- ord-dogecoin codebase (once all minting logic is ported)
- Any backend/indexer logic not needed for frontend minting

## Final Checklist
- [ ] All minting/inscription features available in Dogemint
- [ ] Wallet and transaction APIs fully implemented
- [ ] Batch operations supported
- [ ] Provider abstraction for RPC/API
- [ ] Documentation and migration guides complete
- [ ] External indexer/explorer integration tested

---
Once this checklist is complete, ord-dogecoin can be safely deleted for frontend minting use cases. Dogemint will be the only required library for dApp developers.
