import type { ComponentProps } from 'react'
import { buttonClass, type ButtonStyleProps } from './buttonClass'

type ButtonProps = ButtonStyleProps & ComponentProps<'button'>

export function Button({ variant, size, block, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass({ variant, size, block }, className)} {...rest} />
}

type ButtonLinkProps = ButtonStyleProps & ComponentProps<'a'>

/** A link styled as a button — use when the action navigates. */
export function ButtonLink({ variant, size, block, className, ...rest }: ButtonLinkProps) {
  return <a className={buttonClass({ variant, size, block }, className)} {...rest} />
}
