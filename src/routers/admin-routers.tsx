import { Cat, LucideHome, LucideMenu } from 'lucide-react'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'
import SidebarHref from '../components/sidebar-href'
import SidebarItem from '../components/sidebar-item'
import SidebarContext from '../components/sidebar-context'
import If from '../components/if'
import NavbarMenu from '../components/navbar-menu'
import NavbarRoot from '../components/navbar-root'
import NavbarHamburguer from '../components/navbar-hamburguer'
import PlayerRoundStats from '../pages/player-round-stats'
import PlayerRoundsList from '../pages/player-rounds-list'
import PlayersList from '../pages/players-list'
import PlayerRoundChartResult from '../pages/player-round-chart-result'
import PlayerGamesList from '../pages/player-games-list'
import PlayerRoundGame from '../pages/player-round-game'
import PlayersListStats from '../pages/players-list-stats'

function AdminRouters() {
    const { logout, isAuthenticated } = useContext(AuthContext)

    return (
        <If conditional={isAuthenticated}>
            <SidebarContext>
                <NavbarRoot>
                    <NavbarMenu>
                        <SidebarItem href='/player-game-list'>
                            <LucideHome className='w-6 h-6' strokeWidth={2} />
                            <SidebarHref>Home</SidebarHref>
                        </SidebarItem>
                        <SidebarItem onClick={logout} href='' variation='spacing-top'>
                            <LucideHome className='w-6 h-6' strokeWidth={2} />
                            <SidebarHref>Exit </SidebarHref>
                        </SidebarItem>
                    </NavbarMenu>
                    <NavbarHamburguer>
                        <div className='w-full'>
                            <Cat className='w-7 h-7 text-white' />
                        </div>
                        <LucideMenu className='w-7 h-7 text-zinc-300' />
                    </NavbarHamburguer>
                </NavbarRoot>
            </SidebarContext>
            <div className='h-screen pt-12'>
                <div className='overflow-y-auto p-3 h-full'>
                    <Routes>
                        <Route path="/game/:gameId/player-round-game" element={<PlayerRoundGame />} />
                        <Route path="/game/:gameId/player-round-stats/:round" element={<PlayerRoundStats />} />
                        <Route path="/player-game-list" element={<PlayerGamesList />} />
                        <Route path="/game/:gameId/player-rounds-list" element={<PlayerRoundsList />} />
                        <Route path="/game/:gameId/players-list" element={<PlayersList />} />
                        <Route path="/game/:gameId/players-list/round" element={<PlayersListStats />} />
                        <Route path="/game/:gameId/player-round-chart-result" element={<PlayerRoundChartResult />} />
                    </Routes>
                </div>
            </div>
        </If>
    )
}

export default AdminRouters