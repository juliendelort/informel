# Changelog

## [1.3.2] - 2022-04-21

### Fixed
- Issues with `<input type="file">`

## [1.3.1] - 2022-04-20

### Fixed
- `reset()` that was showing 'undefined' in text inputs
- `setValues()` that was ignoring radio buttons

## Removed
- `setValues()` no longer emits `input` and `change` events



## [1.3.0] - 2022-04-10
### Added
- Set `aria-invalid` attribute when invalid
- `touched-on-input` attribute on `<inform-field>`


## [1.2.1] - 2022-03-15
### Fixed
- Event conflicts for inputs without names
- Parse values for `<input type="number"/>`

## [1.2.0] - 2022-03-13
### Added
- Support for `formaction` & `formmethod` attributes.

## [1.1.0] - 2022-03-12
### Added
- Support for `<select multiple>`.

## [1.0.0] - 2022-03-06
- 1.0.0 release

## [0.0.35] - 2022-03-03
### Fixed
- Typo in README.

## [0.0.34] - 2022-03-01
### Fixed
- `error-disable-submit` now disables the submit button only while error are shown (not disabled when the form is loaded)

## [0.0.33] - 2022-02-27

### Fixed
- Fixed `reset-on-submit` for extra values

## [0.0.32] - 2022-02-27

### Fixed
- Resetting extra values

## [0.0.31] - 2022-02-27

### Fixed
- Extra field returned by validationHandler were not ignored

## [0.0.30] - 2022-02-27

### Added
- Support for extra values
- `name` attribute on `inform-field` for extra values.

### Fixed
- Some reset issues: passed values were not always remembered.

## [0.0.29] - 2022-02-27

### Fixed
- method defaults to 'GET' when not specified.

## [0.0.28] - 2022-02-27

### Fixed
- Support for other methods than get and post.
