# Setup Defold Github Action

This action downloads [Defold](https://defold.com)'s `bob.jar` and `dmengine_headless`.

## Inputs

### `sha1`

The engine hash or release channel (`stable`, `beta`, `alpha`) to download.
Defaults to `stable`.

### `path`

The path where to download the files. Defaults to `.defold`.

## Example usage

```
uses: dapetcu21/setup-defold@v1
with:
  sha1: '29b8e598b0bce19b274327c5d9711f78b3bd0c22'
```