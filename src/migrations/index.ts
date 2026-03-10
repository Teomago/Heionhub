import * as migration_20260310_231650_init from './20260310_231650_init';
import * as migration_20260310_232127_init from './20260310_232127_init';

export const migrations = [
  {
    up: migration_20260310_231650_init.up,
    down: migration_20260310_231650_init.down,
    name: '20260310_231650_init',
  },
  {
    up: migration_20260310_232127_init.up,
    down: migration_20260310_232127_init.down,
    name: '20260310_232127_init'
  },
];
