## Simple github action that fetches the latest offical release version of dnn.

### inputs
**owner**: the repository owner (optional), defaults to dnnsoftware.
**repo**: The repository name (optional), defaults to Dnn.Platform

### outputs
**version** An object containing the following properties
* tag: string representing the latest tag
* major: number representing the major version
* minor: number representing the minor version
* patch: number representing the path version
* manifestSafeVersionString: A string that is save to use in manifest version numbers.

Example:
```json
{
    tag: 'v9.6.0',
    major: 9,
    minor: 6,
    patch: 0,
    manifestSafeVersionString: '09.06.00'
}
```