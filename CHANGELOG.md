# Changelog

## [1.7.2] - 2022-07-13

### Fixed

- InformField TS definition: added missing `name` and `ref` optional props.
- Accessibility fixes: focusing the first invalid input on submit + added `aria-description` with `aria-invalid`

## [1.7.1] - 2022-07-04

### Fixed

- `setValues` resetting other extra values
- Removed reference to `RadioNodeList` (not supported by jest/jsdom)


## [1.7.0] - 2022-06-04

### Added

- `initialValues` prop to `InformEl` (React)

### Fixed

- InformelProps type

## [1.6.1] - 2022-05-27

### Fixed

- Added missing `submitOnChange` prop to `InformField`.
- React component definition: useEffect -> useLayoutEffect

## [1.6.0] - 2022-05-07

### Added

- React: Support for camelCase props.

### Fixed

- React: fixed boolean props

## [1.5.0] - 2022-04-25

### Fixed

- Form values don't include empty number inputs and empty file inputs anymore

### Changed

- Renamed `input`, `change` and `submit` custom events to `inform-input`, `inform-change` and `inform-submit`.

## [1.4.0] - 2022-04-23

### Fixed

- Calling `requestSubmit()` on the `<form>` was throwing an error
- InformEl React element type.

### Added

- `inform-el` requestSubmit() method
- `inform-el` submit event details now contains a `submitter` field.


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
