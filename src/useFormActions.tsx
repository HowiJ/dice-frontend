import type { FormEvent } from "react";

import { useState } from "react";

type FormElementTypes = HTMLInputElement | HTMLButtonElement;
type FormActions = [string, (event: FormEvent<FormElementTypes>) => void];

function useFormActions(): FormActions {
  const [value, setValue] = useState<string>("");
  function onChange(e: FormEvent<FormElementTypes>): void {
    e.preventDefault();
    setValue(e.currentTarget.value);
  }

  return [value, onChange];
}

export default useFormActions;
