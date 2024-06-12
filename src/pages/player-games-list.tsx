import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import { Link, useNavigate } from 'react-router-dom'
import { Cat, MoveLeft } from 'lucide-react'
import { back } from '../context/auth-config'
import { GameService } from '../services/game-service'

function PlayerGamesList() {
  const navigate = useNavigate()
  const gameService = new GameService()
  const [games, setGames] = useState<any[]>()

  useEffect(() => {
    gameService.getGames().then((r: any) => {
      setGames(r)
    })
  }, [])

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-3 items-center jus'>
        <h1 className='font-semibold text-lg'>Jogos</h1>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 w-full h-full">
        {
          games?.map(e =>
            <div className="flex gap-3 flex-col text-black flex-1 p-6 py-6 rounded-sm  bg-white shadow-lg ">
              <div className='flex gap-3 items-center justify-center w-full'>
                <Cat className='w-10 h-10' />
              </div>
              <div className='flex gap-3 justify-center w-full'>
                <div className='font-semibold'>
                  Nome do jogo:
                </div>
                <div>
                  {e.gameName}
                </div>
              </div>
              <Button onClick={() => navigate(`/game/${e.id}/player-round-game`)}>Entrar no jogo</Button>
              <Button onClick={() => navigate(`/game/${e.id}/players-list`)}>Ver placar de jogadores</Button>
              <Button onClick={() => navigate(`/game/${e.id}/players-list/my/round`)}>Ver meus resultados</Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PlayerGamesList