import { useQuery } from "@tanstack/react-query"
import { SingleGameType, SinglePlayerType,SingleTeamType } from "../types"
import { useApi } from "./useApi"

const useGetApi = () => {
	const { apiGet } = useApi()

    const { data: players } = useQuery({
		queryKey: ['players'],
		queryFn: async () => await apiGet<SinglePlayerType[]>('players'),
	})
	const { data: teams } = useQuery({
		queryKey: ['teams'],
		queryFn: async () => await apiGet<SingleTeamType[]>('teams'),
	})
	const { data: games } = useQuery({
		queryKey: ['games'],
		queryFn: async () => await apiGet<SingleGameType[]>('games'),
	})
	return {
		teams,
		players,
		games
	}
}

export {useGetApi}