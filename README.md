# Quoter Migrator

A Tool to migrate a Quoter database from quick.db (SQLite3) to mongoose (mongoDB).

## Usage

1.  Clone this repository.
2.  Install dependencies with `npm install`.
3.  Add a quick.db Quoter database file named `json.sqlite`.
4.  Rename `config.json.EXAMPLE` to `config.json` and configure your `mongoPath`.
5.  Run `node .` to begin the migration process!

When your console shows every guild as being migrated (eg. `100/100`), you can safely exit the script.

## License

Copyright (C) 2021 Nicholas Christopher

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
