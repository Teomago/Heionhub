import * as migration_20260310_231650_init from './20260310_231650_init';
import * as migration_20260310_232127_init from './20260310_232127_init';
import * as migration_20260311_014355_i18n_tables from './20260311_014355_i18n_tables';

export const migrations = [
  {
    up: migration_20260310_231650_init.up,
    down: migration_20260310_231650_init.down,
    name: '20260310_231650_init',
  },
  {
    up: migration_20260310_232127_init.up,
    down: migration_20260310_232127_init.down,
    name: '20260310_232127_init',
  },
  {
    up: migration_20260311_014355_i18n_tables.up,
    down: migration_20260311_014355_i18n_tables.down,
    name: '20260311_014355_i18n_tables'
  },
];
