
[Github Discussion Thread](https://github.com/block-core/angor/discussions/322)
### Refractoring Changes Plan

- First task is the unlink everything that uses wallet words directly
- Instead should be using an Extended Public Key for all their derivation

### Derive Operations
- currently using wallet words all over the place to derive, 
- check if the extendedPubKey derived from the wallet words can be directly used