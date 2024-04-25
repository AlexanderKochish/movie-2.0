import * as React from 'react'
import { FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/shared/ui/TextField/TextField'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState,
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <TextField id={name} onChange={onChange} value={value} {...rest} {...field} />
}
