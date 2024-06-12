import React, { useContext, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/auth-context.tsx'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import InputRoot from '../components/input-root.tsx'
import InputText from '../components/input-text.tsx'
import Label from '../components/label.tsx'
import { Form } from '../components/form.tsx'
import Button from '../components/button.tsx'
import { Cat } from 'lucide-react'
import Content from '../components/content.tsx'
import Span from '../components/span.tsx'

function Login() {
  const [loginLoading, setLoginLoding] = useState(false)
  const formSchema = z.object({
    email: z.string().nonempty("Campo Obrigatório").email("E-Mail Inválido"),
    password: z.string().nonempty("Campo Obrigatório")
  })

  const { handleSubmit, formState: { errors }, register, setValue } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );
  const { signIn } = useContext(AuthContext)

  async function handleSingIn(data) {
    setLoginLoding(true)
    await signIn(data)
      .then(() => {
        setLoginLoding(false)
      })
      .catch(() => {
        setLoginLoding(false)
      })
  }

  return (
    <Content>
      <div className='items-center justify-center gap-3 flex flex-col text-black'>
        <div className='flex gap-3 items-center'>
          <Cat className='w-10 h-10' />
          <h1 className='items-center text-xl font-bold'>Resgato</h1>
        </div>
        <div className='flex flex-col w-96 h-86 items-center bg-white p-9 rounded shadow-lg'>
          <Form onSubmit={handleSubmit(handleSingIn)} variation='default'>
            <InputRoot>
              <Label>E-mail</Label>
              <InputText {...register("email")} variation='default'></InputText>
              <Span variation='error'>{errors.email?.message}</Span>
            </InputRoot>
            <InputRoot>
              <Label>Senha</Label>
              <InputText type='password' {...register("password")} variation='default'></InputText>
              <Span variation='error'>{errors.password?.message}</Span>
            </InputRoot>
            <div className='flex justify-evenly gap-1'>
              <p>Esqueceu a senha?</p>
              <a href='/home' className='text-blue-700 float-right'>Recuperar Senha</a>
            </div>
            <Button loading={loginLoading} variation='default'>Entrar</Button>
          </Form>
        </div>
        <div className='flex flex-row justify-center gap-2'>
          <p>Não possui uma conta? </p>
          <Link to='/signup' className='text-blue-700 float-right'>Clique aqui!</Link>
        </div>
      </div>
    </Content>

  )
}

export default Login
