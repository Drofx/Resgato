import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import { GameService } from '../services/game-service'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);


function PlayerRoundStats() {
  const { round, gameId } = useParams()
  const navigate = useNavigate()
  const gameService = new GameService()
  const [gameData, setGameData] = useState({
    roundNumber: null,
    deadLine: null,
    qtdMaleCastrate: null,
    qtdFemaleCastrate: null,
    dateCastration: null,
    qtdMaleShelter: null,
    qtdFamaleShelter: null,
    resultRound: {
      totalPopulation: null,
      totalPopulationCastrated: null,
      totalPopulationFemaleCastrated: null,
      totalPopulationMaleCastrated: null
    }
  })

  function generateSineWaveData(points, amplitude, frequency, offset) {
    const data = [];
    for (let i = 0; i < points; i++) {
      const value = amplitude * Math.sin((2 * Math.PI * frequency * i) / points) + offset;
      data.push(value);
    }
    return data;
  }

  const charts = {
    labels: Array.from({ length: 365 }, (_, i) => ""),
    datasets: [
      {
        label: 'Dataset 1',
        data: generateSineWaveData(365, 280, 3, 500),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 1',
        data: generateSineWaveData(365, 500, 2.7, 500),
        borderColor: 'rgb(138,43,226)',
        backgroundColor: 'rgb(138,43,226)',
      },
    ],
  };

  function nextRound() {
    if (Number(round) + 1 < 4) {
      navigate(`/game/${gameId}/player-round-game`)
    }
    else {
      navigate(`/game/${gameId}/players-list`)
    }
  }

  useEffect(() => {
    gameService.getAnswers(gameId).then((e: any[]) => {
      setGameData(e.filter(e => e.roundNumber == round)[0])
    })
  }, [])

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
      <div className='h-full w-full flex items-center justify-center'>
        <div className='flex gap-3 flex-col w-96 first-letter:h-86 items-center bg-white p-6 rounded shadow-lg'>
          <div className='flex gap-1'>
            <h1 className='font-bold text-lg'>Ano: </h1>
            <h1 className='text-lg'>1</h1>
          </div>
          <Line data={charts}></Line>
          <Button onClick={nextRound}>
            <Link className='flex-1' to='/player-round-game'>Ir para proxima rodada</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlayerRoundStats