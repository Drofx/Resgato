import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupService } from '../services/signup-service';
import InputRoot from '../components/input-root'
import InputText from '../components/input-text'
import Label from '../components/label'
import Span from '../components/span'
import { Form } from '../components/form'
import Button from '../components/button'
import { Link, useNavigate } from 'react-router-dom';
import { number } from '../utils/extensions/zod';
import Content from '../components/content';


function Signup() {
  const [loading, setLoading] = useState({
    signupForm: false
  })
  const [signUpSuccefull, setSignUpSuccefull] = useState(false)
  const navigate = useNavigate()
  const signupService = new SignupService()
  const formSchema = z.object({
    email: z.string().nonempty("Campo Obrigatório").email("E-mail Inválido"),
    studentCode: z.string().nonempty("Campo Obrigatório").refine(data => number(data), "Apenas Números"),
    name: z.string().nonempty("Campo Obrigatório"),
    password: z.string().nonempty("Campo Obrigatório"),
    passwordConfirm: z.string().nonempty("Campo Obrigatório")
  })
  const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  function handleSingup(data) {
    setLoading({ ...loading, signupForm: true })
    signupService.signupPost(data)
      .then(() => {
        setSignUpSuccefull(true)
        navigate('/login')
      })
      .catch(() => {
      })
      .finally(() => {
        setLoading({ ...loading, signupForm: true })
      })
  }

  return (
    <Content>
      <div className='items-center justify-center flex flex-col text-black'>
        <h1 className='items-center text-xl font-bold'>Entre no Jogo</h1>
        <div className='flex flex-col w-96 h-86 items-center bg-white p-9 rounded shadow'>
          <Form onSubmit={handleSubmit(handleSingup)} variation='default'>
            <InputRoot>
              <Label>Nome</Label>
              <InputText {...register("name")} variation='default'></InputText>
              <Span variation="error">{errors.name?.message}</Span>
            </InputRoot>
            <InputRoot>
              <Label>RA</Label>
              <InputText {...register("studentCode")} variation='default'></InputText>
              <Span variation='error'>{errors.studentCode?.message}</Span>
            </InputRoot>
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
            <InputRoot>
              <Label>Confirmar Senha</Label>
              <InputText type='password' {...register("passwordConfirm")} variation='default'></InputText>
              <Span variation='error'>{errors.passwordConfirm?.message}</Span>
            </InputRoot>
            <Button loading={loading.signupForm} variation='default'>Cadastrar</Button>
          </Form>
        </div>
        <div className='flex flex-row justify-center gap-2'>
          <p>Já possui uma conta? </p>
          <Link to='/login' className='text-blue-700 float-right'>Clique aqui!</Link>
        </div>
      </div>

    </Content>
  )
}

export default Signup