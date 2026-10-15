# Form components: known pitfalls

Bugs found and fixed in `TextInput.tsx`. Check every other component in this
folder (and new ones) for the same patterns. `TextInput.tsx` is the reference
implementation.

## react-hook-form integration

- **Wire `field.ref` to the DOM element.** Without it, `setFocus(name)` and
  `shouldFocusError` silently do nothing. If the component also accepts a
  `ref`, combine both with `mergeRefs(field.ref, ref)` from `@/lib/utils`.
- **Wire `field.onBlur`.** Without it, fields are never marked touched, so
  `mode: "onBlur"` / `"onTouched"` never validate. If the component accepts
  an `onBlur`, call both: `field.onBlur(); onBlur?.(e);`.
- **Don't read `errors[name]`.** It is `undefined` for nested names like
  `"address.city"`, since RHF stores errors as nested objects. Use
  `fieldState.error?.message` from `Controller`'s render prop (or
  `getFieldState(name)`).
- **Don't let RHF handlers silently override consumer props.** Spreading
  `{...props}` and then setting `onChange` / `onBlur` / `ref` drops whatever
  the caller passed. Either call both handlers or `Omit` the prop from the
  type so it can't be passed.
- **Respect `field.disabled`** (`disabled={field.disabled ?? props.disabled}`).

## Types

- **Use `ComponentProps<"input">` (or `<"textarea">`, etc.), not
  `HTMLAttributes<...>`.** `HTMLAttributes` lacks `disabled`, `required`,
  `maxLength`, `autoComplete` and so on, and `ComponentProps` includes `ref`
  (a normal prop in React 19, so no `forwardRef`).
- **`Omit` the props the component controls** (`value`, `defaultValue`,
  `onChange`, `name`) so callers get a type error instead of silent behaviour.
- **Express "form mode vs controlled mode" as a union type, not a runtime
  `throw`.** The form variant needs `value?: undefined` (optional). A
  required `value: undefined` breaks every `<X name="..." />` call site.

## Accessibility

- **Don't use `id={name}`.** Controlled inputs have no `name`, so the label
  isn't linked; the same field name in two forms produces duplicate IDs; and
  a caller's `id` gets overwritten. Use `props.id ?? useId()`.
- **Link errors to the input:** set `aria-invalid` when there is an error and
  `aria-describedby` pointing at `<ErrorMessage id={errorId}>` (merged with
  any `aria-describedby` the caller passed).

## Styling

- Don't put `flex` on an `<input>` (it does nothing), and keep focus styles on
  one variant (`focus-visible:`), not a mix of `focus:` and `focus-visible:`.

## Known offenders

`EmailInput.tsx`, `DateInput.tsx`, `NumberInput.tsx`, `TextArea.tsx`, `SingleSelect.tsx`, `Select.tsx`, `RadioGroup.tsx` and `PhoneInput.tsx` are fixed. Assume other
inputs in this folder (selects, etc.) have the same problems until they've been checked.
