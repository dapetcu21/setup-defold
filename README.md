# Setup Defold Github Action

This action downloads [Defold](https://defold.com)'s `bob.jar` and `dmengine_headless`
and adds them to `PATH`.

## Inputs

### `sha1`

The engine hash or release channel (`stable`, `beta`, `alpha`) to download.
Defaults to `stable`.

### `path`

The path where to download the files. This will be added to `PATH`. Defaults to `.defold`. 

## Example usage

```yml
- uses: actions/setup-java@v1
  with:
    java-version: '11'
- uses: dapetcu21/setup-defold@v1
  with:
    sha1: '29b8e598b0bce19b274327c5d9711f78b3bd0c22'
- run: 'java -jar .defold/bob.jar --auth "foobar" --email "john@doe.com" resolve'
- run: 'java -jar .defold/bob.jar --variant debug build'
- run: 'dmengine_headless'
```