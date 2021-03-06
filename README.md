# necrodancer-custom-music
CLI tool used to import custom music into Crypt of the Necrodancer without being in-game.

## Rundown
1) Downloads the provided media URL with `youtube-dl`
2) Converts the media to `MP3` format with `ffmpeg` or any other valid converter
3) Beat-maps the audio file with `beattracker` based on `essentia` (shipped with the game on Windows); alternatively, uses a static beats-per-minute value
4) Edits the game's save file to add dummy symlinks - all at once (only happens when run for the first time)
5) Creates a symlink for the music file in `./symlinks` <==> `./music`
6) Creates a symlink for the beatmap file in `./beatmaps` <==> `(game-dir)/data/custom_music/` 

Remarks:
- Audio files are stored in `./music/` 
- Beatmap files are stored in `./beatmaps`
- Since the script is using symlinks, the music can be swapped:
    - when the game is not running
    - ingame, in lobby
    - ingame, in a different level
- On Windows, in order to create symlinks, admin rights are required. 
Alternatively, the `SeCreateSymbolicLinkPrivilege` privilege needs to be allowed for the current user.
More info: [StackExchange discussion](https://security.stackexchange.com/questions/10194/why-do-you-have-to-be-an-admin-to-create-a-symlink-in-windows)


## Module

todo - documentation for `require/import`

## CLI tool

### Usage
- clone/fork the repo
- run `npm` or `yarn`
- run `npm run init` or `yarn run init`
- edit `config.json` and fill in the `directory` property with your Crypt of the Necrodancer install directory
- make sure to back up your game save file before proceeding - in case it needs to be rolled back
- run script with `node ./index.js` or `./index.js` (with shebang)

### Config
- `directory` - path to Crypt of the NecroDancer install directory
- `beatmapExecutable` - path to the beat-mapping executable (note that relevant argument has higher priority than config value)

### Arguments
```./index.js (video-url) (zone-id) [-h|--help] [--bpm] [--offset] [--force-reload] [--beat-tracker]```

- `-h`, `--help` Prints a simple usage help
- `(video-url)` First argument - media video link to be downloaded, beat-mapped and added to the game
- `(zone-id)` Second argument - game zone identifier
- `--bpm=#` If provided, the beat will be static, and generated from the provided BPM number
- `--offset=#` If provided along with `--bpm`, the beats will be shifted forward by this offset - provided in **seconds**
- `--force-reload` Re-downloads the audio file, and re-runs beat mapping even if the files are already present
- `--beat-tracker` When using automatic beat mapping, this is the path to the beat-mapping executable.
If not provided, uses the default one found on Windows in `(game-dir)/data/essentia/beattracker.exe` 
- `--debug` Enables debug logging

## Zone identifiers
Each song can be bound to exactly one game zone track per execution.
The full list of identifiers can be found in `./zone-map.json`, and edited - if this is desired

### Regular zones
These follow the identifier format `(zone)-(level)`, ranging from `1-1` through `5-3`.

### Boss zones
Boss areas can use either of multiple identifiers:

| Boss  |Full | Simple | Code  |
| :---- |:---:|  :---: | :---: |
| King Conga Kappa | `king-conga`   | `conga` | `boss-1` |
| Deep Blues       | `deep-blues`   | `chess` | `boss-2` |
| Death Metal      | `death-metal`  | `metal` | `boss-3` |
| Coral Riff       | `coral-riff`   | `bass`  | `boss-4` |
| Fortissimole     | `fortissimole` | `mole`  | `boss-5` |