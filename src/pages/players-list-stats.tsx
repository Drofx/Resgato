import React from 'react'
import { Form } from '../components/form'
import InputRoot from '../components/input-root'
import Label from '../components/label'
import InputText from '../components/input-text'
import Span from '../components/span'
import Content from '../components/content'
import {  MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function PlayersListStats() {
  return (
    <div className='flex flex-col gap-6 '>
      <div className='flex gap-3 items-center jus'>
        <div className='rounded-full bg-zinc-200 w-fit p-1'>
          <Link to={'/player-game-list'}>
            <MoveLeft className='w-5 h-5' />
          </Link>
        </div>
        <h1 className='font-semibold text-lg'>Placar de jogadores </h1>
      </div>
      <div className='w-full flex items-center flex-col gap-6'>
        <div className='flex flex-col w-96 first-letter:h-86 items-center bg-white p-9 rounded shadow-lg'>
          <Form variation='default' onSubmit={() => { }}>
            <h1 className='font-semibold'>Rodada 1 - Escolhas</h1>
            <InputRoot>
              <Label>Castração </Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
            <InputRoot>
              <Label>Castração Macho</Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
            <InputRoot>
              <Label>Data da Castração</Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
            <InputRoot>
              <Label>Construção de abrigos p/ macho - Quantidade</Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
            <InputRoot>
              <Label>Construção de abrigos p/ fêmea - Quantidade</Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
          </Form>
        </div>
        <div className='flex flex-col w-96 first-letter:h-86 items-center bg-white p-9 rounded shadow-lg'>
          <Form variation='default' onSubmit={() => { }}>
            <h1 className='font-semibold'>Rodada 1 - Resultados</h1>
            <InputRoot>
              <Label>Castração </Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
            <InputRoot>
              <Label>Castração Macho</Label>
              <InputText variation='default'></InputText>
              <Span variation='default' children={undefined}></Span>
            </InputRoot>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default PlayersListStats