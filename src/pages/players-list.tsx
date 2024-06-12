import React, { useEffect, useState } from 'react'
import TableRoot from '../components/table-root'
import TableHead from '../components/table-head'
import TableRow from '../components/table-row'
import TableCell from '../components/table-cell'
import TableBody from '../components/table-body'
import Content from '../components/content'
import Button from '../components/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import { GameService } from '../services/game-service'

function PlayersList() {
  const navigate = useNavigate()
  const gameService = new GameService()
  const [games, setGames] = useState<any[]>()
  let { gameId } = useParams();

  useEffect(() => {
    gameService.getPlayers(gameId).then((r: any) => {
      setGames(r)
    })
  }, [])

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
      <TableRoot>
        <TableHead variation='sticky'>
          <TableRow>
            <TableCell variation='head' >Posição</TableCell >
            <TableCell variation='head' >Nome</TableCell >
            <TableCell variation='head' >População Final de Gatos</TableCell >
            <TableCell variation='head' > </TableCell >
          </TableRow>
        </TableHead>
        <TableBody >
          {
            games?.map(e=>[
              <TableRow >
              <TableCell variation='body'>
                {e.position}
              </TableCell>
              <TableCell variation='body' >
                {e.name}
              </TableCell>
              <TableCell variation='body' >
                {e.totalPopulation}
              </TableCell>
              <TableCell variation='body' >
                <Button>
                  <Link className='flex-1' to={`/game/${gameId}/players-list/${e.id}/round`}>Ver resultados</Link>
                </Button>
              </TableCell>
            </TableRow>
            ])
          }
        </TableBody>
      </TableRoot>
    </div>
  )
}

export default PlayersList