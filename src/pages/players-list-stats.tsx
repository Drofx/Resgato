import React, { useEffect, useState } from 'react'
import { Form } from '../components/form'
import InputRoot from '../components/input-root'
import Label from '../components/label'
import InputText from '../components/input-text'
import Span from '../components/span'
import Content from '../components/content'
import { MoveLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { gameService } from '../services/game-service'
import { back } from '../context/auth-config'
import { charts } from '../utils/extensions/default'
import { Line } from 'react-chartjs-2'

function PlayersListStats() {
  const { playerId, gameId } = useParams()
  const [playerData, setPlayerData] = useState({
    // rounds: [
    //   {
    //     roundNumber: 0,
    //     deadLine: null,
    //     qtdMaleCastrate: null,
    //     qtdFemaleCastrate: null,
    //     dateCastration: null,
    //     qtdMaleShelter: null,
    //     qtdFamaleShelter: null,
    //     resultRound: {
    //       totalPopulation: null,
    //       totalPopulationCastrated: null,
    //       totalPopulationFemaleCastrated: null,
    //       totalPopulationMaleCastrated: null
    //     }
    //   },
    // ]
  })

  useEffect(() => {
    if (playerId == "my") {
      gameService.getMyResults(gameId).then(e => {
        console.log(e)
        setPlayerData(e)
      })
    }
    else {
      gameService.getPlayerRoundsResults(gameId, playerId).then(e => {
        setPlayerData(e)
      })
    }
  }, [])

  return (
    <div className='flex flex-col gap-6 '>
      <div className='flex gap-3 items-center jus'>
        <div className='rounded-full bg-zinc-200 w-fit p-1'>
          <Link to={back}>
            <MoveLeft className='w-5 h-5' />
          </Link>
        </div>
        <h1 className='font-semibold text-lg'>Placar de jogadores </h1>
      </div>
      <div className='w-full flex items-center flex-col gap-6'>
        {
          playerData.rounds?.map(e =>
            <>
              <div className='flex flex-col w-96 first-letter:h-86 items-center bg-white p-9 rounded shadow-lg'>
                <Form variation='default' onSubmit={() => { }}>
                  <h1 className='font-semibold'>Ano {e.roundNumber} - Escolhas</h1>
                  <InputRoot>
                    <Label>Castração </Label>
                    <InputText value={Number(e.qtdFemaleCastrate)+Number(e.qtdMaleCastrate)} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>Castração Macho</Label>
                    <InputText value={e.qtdMaleCastrate} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>Castração Fêmea</Label>
                    <InputText value={e.qtdFemaleCastrate} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>Data da Castração</Label>
                    <InputText value={new Date(e.dateCastration).getDay().toString().padStart(2,"0")+"/"+new Date(e.dateCastration).getMonth().toString().padStart(2,"0")} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>Construção de abrigos p/ macho - Quantidade</Label>
                    <InputText value={e.qtdMaleCastrate} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>Construção de abrigos p/ fêmea - Quantidade</Label>
                    <InputText value={e.qtdFamaleShelter} variation='default'></InputText>
                  </InputRoot>
                </Form>
              </div>
              <div className='flex flex-col w-96 first-letter:h-86 items-center bg-white p-9 rounded shadow-lg'>
                <Form variation='default' onSubmit={() => { }}>
                  <h1 className='font-semibold'>Ano {e.roundNumber} - Resultados</h1>
                  <InputRoot>
                  <Line data={charts}></Line>
                    <Label>População total</Label>
                    <InputText value={e.resultRound.totalPopulation} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>População total de castrados</Label>
                    <InputText value={e.resultRound.totalPopulationCastrated} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>População de machos castrados</Label>
                    <InputText value={e.resultRound.totalPopulationMaleCastrated} variation='default'></InputText>
                  </InputRoot>
                  <InputRoot>
                    <Label>População de fêmeas castrados</Label>
                    <InputText value={e.resultRound.totalPopulationFemaleCastrated} variation='default'></InputText>
                  </InputRoot>
                </Form>
              </div>
            </>
          )??"Nenhum jogo encontrado até o momento"
        }
      </div>
    </div>
  )
}

export default PlayersListStats