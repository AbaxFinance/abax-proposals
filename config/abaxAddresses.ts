export const contractAddresses = [
  {
    name: 'usdc',
    address: '5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z',
    displayName: 'USDC',
  },
  {
    name: 'abax_token',
    address: '5DfSpEnVDLgyf4Gkwwgh8JSeNbCGE89Fo9QgtZ4LfTC6Rh95',

    displayName: 'ABAX',
  },
  {
    name: 'abax_vester',
    address: '5HneVWMHtH9ejQWxxSEAZmcwzM9EyXFATdegUa4fpAHBHeYD',

    vestingFor: 'treasury',
  },
  {
    name: 'abax_vester',
    address: '5D7K6sh5yJSoVeo62765KCkqBqpLbL3zS6MFvaZfT9nn5YLC',

    vestingFor: 'governor',
  },
  {
    name: 'abax_vester',
    address: '5CMYw3jcFJuWdSvaPjheHWnnRx6Q5yCci5UYZkxHsSKMhLCK',

    vestingFor: 'tge',
  },
  {
    name: 'abax_governor',
    address: '5DX8nBod3StXN2frYyf6pW3cJhqozcErmTJHiHSeP45WQv5K',
  },
  {
    name: 'abax_treasury',
    address: '5CzYtzUeyyEJjErAXTSPscNcxk5eiNb1UdovoWt4yoUzVJZd',
  },
  {
    name: 'abax_tge',
    address: '5H6BtP9CYM4XUWpqqgAaVvha67SMxFqFveu66TKJ81Ljn1b1',
  },
  {
    name: 'abax_inflator',
    address: '5CM2JVfWSmoKejtNkorJrKvJZA8RLWCiebs4BbfEhgQJzMeA',
  },
] as const;

export const ABAX_TGE_ADDRESS = contractAddresses.find((contract) => contract.name === 'abax_tge')!.address;

export const GOVERNOR_ADDRESS = contractAddresses.find((contract) => contract.name === 'abax_governor')!.address;
