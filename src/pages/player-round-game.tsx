import React, { useContext, useEffect, useState } from 'react'
import Label from '../components/label'
import InputRoot from '../components/input-root'
import InputText from '../components/input-text'
import Span from '../components/span'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Button from '../components/button'
import { Form } from '../components/form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Content from '../components/content'
import { MoveLeft } from 'lucide-react'
import { back } from '../context/auth-config'
import { number } from '../utils/extensions/zod'
import { dateValidator } from '../utils/extensions/date'
import { GameService } from '../services/game-service'

function PlayerRoundGame() {
  const navigate = useNavigate()
  let { gameId } = useParams();
  const gameService = new GameService()
  const [gameData, setGameData] = useState({
    id: null,
    gameName: null,
    gameConcluded: null,
    answeredRound: null,
    currentRound: 0,
    totalCatsMale: 0,
    totalCatsFemale: 0,
    totalCatsMaleCastrated: null,
    totalCatsFemaleCastrated: null,
    budgetUser: null,
    totalStudent: null
  })
  const formSchema = z.object({
    qtdMaleCastrate: z.string()
      .nonempty("Campo Obrigatório")
      .refine(e =>
        number(e),
        "Apenas numeros"
      )
      .refine(e =>
        Number(e) <= gameData.totalCatsFemale,
        "A quantidade de femeas para castração precisa ser menor do que a população não castrada"
      ),
    qtdFemaleCastrate: z.string()
      .nonempty("Campo Obrigatório")
      .refine(e =>
        number(e),
        "Apenas numeros"
      )
      .refine(e =>
        Number(e) <= gameData.totalCatsMale,
        "A quantidade de machos para castração precisa ser menor do que a população não castrada"
      ),
    dateCastration: z.object({
      monthCastrate: z.string()
        .nonempty("Campo Obrigatório")
        .refine(e =>
          number(e),
          "Apenas numeros"
        )
        .refine(e =>
          Number(e) < 13,
          "O mês tem que ser menor que 12"
        ),
      dayCastrate: z.string()
        .nonempty("Campo Obrigatório")
        .refine(e =>
          number(e),
          "Apenas numeros"
        ),
    })
      .superRefine((e, ctx) => {
        if (!dateValidator(`${e.dayCastrate}-${e.monthCastrate}-0000`)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["dayCastrate"],
            message: "Dia invalido",
          });
        }
      }),
    qtdMaleShelter: z.string()
      .nonempty("Campo Obrigatório")
      .refine(e =>
        number(e),
        "Apenas numeros"
      ),
    qtdFamaleShelter: z.string()
      .nonempty("Campo Obrigatório")
      .refine(e =>
        number(e),
        "Apenas numeros"
      ),

  })
    .superRefine((e, ctx) => {
      console.log(gameData.budgetUser)
      if (Number(gameData.budgetUser) <
        (Number(watch("qtdFemaleCastrate")) * 300) +
        (Number(watch("qtdMaleCastrate")) * 300) +
        (Number(watch("qtdMaleShelter")) * 800) +
        (Number(watch("qtdFamaleShelter")) * 800)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["teste"],
          message: "Quantidade de dinheiro não permitida",
        });
      }
    })
  const { handleSubmit, formState: { errors }, register, setValue, watch } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  function handleSendPlay(data) {
    gameService.answerRound(gameId, data).then(e => {
      setGameData(e)
    }).then(e => {
      navigate(`/game/${gameId}/player-round-stats/${gameData.currentRound}`)
    })
  }

  useEffect(() => {
    gameService.getGameInformation(gameId).then(e => {
      setGameData(e)
    })
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <div className='flex flex-col gap-6 h-full '>
      <div className='flex gap-3 items-center jus'>
        <div className='rounded-full bg-zinc-200 w-fit p-1'>
          <Link to={'/player-game-list'}>
            <MoveLeft className='w-5 h-5' />
          </Link>
        </div>
        <h1 className='font-semibold text-lg'>Nome do jogo: </h1>
        <h1 className='text-lg'>Jogo 1</h1>
      </div>
      {
        gameData.id != null && (
          gameData.answeredRound ?
            <div className='h-full flex items-center justify-center flex-col gap-3 '>
              <div className='w-fit flex flex-col gap-3'>
              <div className='bg-red-400 border-red-500 border rounded p-3 text-white font-semibold w-fit'>
                A proxima rodada ainda não está disponivel
              </div>
                <Button onClick={() => navigate(`/game/${gameId}/players-list/my/round`)}>
                  Ver meus resultados até o momento
                </Button>
              </div>
            </div>
            :
            <div className='flex items-center h-full justify-center'>
              <div className='max-w-xs p-6 shadow bg-white rounded'>
                <div className='flex gap-1'>
                  <h1 className='font-bold text-lg'>Ano: </h1>
                  <h1 className='text-lg'>1</h1>
                </div>
                <p className='mb-3 font-bold'>Dados de jogo</p>
                <div className='flex gap-3 items-center mb-6 justify-between bg-zinc-100 p-1 rounded pl-3'>
                  <p>Saldo atual:</p>
                  <div className='p-1 bg-zinc-300 rounded'>{gameData.budgetUser}</div>
                </div>
                <div className='flex gap-3 items-center mb-6 justify-between bg-zinc-100 p-1 rounded pl-3'>
                  <p>Femeas castradas:</p>
                  <div className='p-1 bg-zinc-300 rounded'>{gameData.totalCatsFemaleCastrated}</div>
                </div>
                <div className='flex gap-3 items-center mb-6 justify-between bg-zinc-100 p-1 rounded pl-3'>
                  <p>Femeas não castradas:</p>
                  <div className='p-1 bg-zinc-300 rounded'>{gameData.totalCatsMale}</div>
                </div>
                <div className='flex gap-3 items-center mb-6 justify-between bg-zinc-100 p-1 rounded pl-3'>
                  <p>Machos castradas:</p>
                  <div className='p-1 bg-zinc-300 rounded'>{gameData.totalCatsMale}</div>
                </div>
                <div className='flex gap-3 items-center mb-6 justify-between bg-zinc-100 p-1 rounded pl-3'>
                  <p>Machos não castradas:</p>
                  <div className='p-1 bg-zinc-300 rounded'>{gameData.totalCatsMaleCastrated}</div>
                </div>
                <p className='mb-3 font-bold'>Rodada</p>
                <Form variation='default' onSubmit={handleSubmit(handleSendPlay)}>
                  <InputRoot>
                    <Label>Castração Fêmea: UN/300$</Label>
                    <InputText variation='default' {...register('qtdFemaleCastrate')}></InputText>
                    <Span variation='error'>{errors.qtdFemaleCastrate?.message}</Span>
                  </InputRoot>
                  <InputRoot>
                    <Label>Castração Macho: UN/300$</Label>
                    <InputText variation='default' {...register('qtdMaleCastrate')}></InputText>
                    <Span variation='error'>{errors.qtdMaleCastrate?.message}</Span>
                  </InputRoot>
                  <InputRoot>
                    <Label>Construção de abrigos p/ macho: UN/800$</Label>
                    <InputText variation='default' {...register('qtdMaleShelter')}></InputText>
                    <Span variation='error'>{errors.qtdMaleShelter?.message}</Span>
                  </InputRoot>
                  <InputRoot>
                    <Label>Construção de abrigos p/ fêmea: UN/800$</Label>
                    <InputText variation='default' {...register('qtdFamaleShelter')}></InputText>
                    <Span variation='error'>{errors.qtdFamaleShelter?.message}</Span>
                  </InputRoot>
                  <InputRoot>
                    <Label>Dia Castração</Label>
                    <InputText maxLength={2} variation='default' {...register('dateCastration.dayCastrate')}></InputText>
                    <Span variation='error'>{errors.dateCastration?.dayCastrate?.message ?? errors.dateCastration?.message}</Span>
                  </InputRoot>
                  <InputRoot>
                    <Label>Mês da Castração</Label>
                    <InputText maxLength={2} variation='default' {...register('dateCastration.monthCastrate')}></InputText>
                    <Span variation='error'>{errors.dateCastration?.monthCastrate?.message}</Span>
                  </InputRoot>
                  <div className='flex gap-3 items-center justify-between bg-zinc-100 p-1 rounded pl-3'>
                    <p>Custo final: </p>
                    <div className='p-1 bg-zinc-300 rounded'>{
                      (Number(watch("qtdFemaleCastrate")) * 300) +
                      (Number(watch("qtdMaleCastrate")) * 300) +
                      (Number(watch("qtdMaleShelter")) * 800) +
                      (Number(watch("qtdFamaleShelter")) * 800)
                    }</div>
                  </div>
                  <Span variation='error'>{errors.teste?.message}</Span>
                  <Button variation='default'>Enviar Jogada</Button>
                </Form>
              </div>
            </div>
        )
      }
    </div>
  )
}

export default PlayerRoundGame