import { LucideLoaderCircle } from 'lucide-react';
import React, { LegacyRef, forwardRef } from 'react';
import useSelector from '../utils/hooks/use-selector';

interface ButtonProps {
  loading?: boolean
  loadingComponent?: React.ReactNode
  children: React.ReactNode
  className: string
  ref: any
  onClick?: (e: any) => any
  type?: "submit" | "reset" | "button" | undefined
  form?: string
}

const ButtonContainer = forwardRef((_: ButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      className={_.className}
      onClick={_.onClick}
      type={_.type}
      form={_.form}
      disabled={_.loading}
    >
      {_.loading ? _.loadingComponent : _.children}
    </button>
  );
})

const buttonVariations = {
  default: (props: ButtonProps, ref: any) => {
    return (
      <ButtonContainer
        {...props}
        ref={ref}
        loadingComponent={
          <LucideLoaderCircle className='w-6 h-6  rotate' />
        }
        className='bg-oikos-green w-full rounded text-center shadow hover:bg-opacity-70 transition-all h-9 p-1 px-3 bg-blue-500 text-white font-semibold flex justify-center items-center' />
    )
  }
}

const Button = useSelector<keyof typeof buttonVariations, ButtonProps>(buttonVariations)

export default Button
