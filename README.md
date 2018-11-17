Ionic (V3) Ethereum Client
===================
A simple Ionic V3 project that implements an Ethereum client using the web3.js library wrapped in a Provider, located in: [src/providers/ethereum/ethereum.ts](src/providers/ethereum/ethereum.ts)
It's not a complete product or a production ready component you can just add to your project. It's more a POC that you can leverage on to start faster in the development of your own app.

## How to use it
This repo was tested with Ionic V3.9.2 and Node.js V8.9.2. If it doesn't work out of the box with your specific environment you should probably tweak it or adapt the source code. To connect to Ethereum you need to provide a geth-compatible RPC server running on your local machine at `http://localhost:8545`, or somewhere else provided by you or others. At time of this writing the most used option was https://infura.io

0. clone this repository
1. `npm install`
2. `cp src/env.template.ts src/env.ts`
3. Change the values in your src/env.ts to suit your needs
4. `ionic serve` (to run in browser) or `ionic emulate android` (to run in Android simulator)

Thanks to @dsbaars for his https://github.com/dsbaars/ethereum-ionic project that I used as an inspiration for this one