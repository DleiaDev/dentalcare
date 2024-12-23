import { UseFormSetError, Path } from "react-hook-form";

type FieldErrors = Record<string, string[]>;

/**
 * Sets form errors returned from the server
 * @param errors Object containing field errors from the server
 * @param setError React Hook Form's setError function
 */
export default function setServerErrors<T extends Record<string, any>>(
  errors: FieldErrors | undefined,
  setError: UseFormSetError<T>,
): void {
  if (!errors) return;

  Object.entries(errors).forEach(([field, messages]) => {
    if (messages && messages.length > 0) {
      if (field in errors) {
        setError(field as Path<T>, {
          type: "server",
          message: messages[0],
        });
      }
    }
  });
}
