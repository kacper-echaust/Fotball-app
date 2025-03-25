import Select, { MultiValue } from 'react-select'
import { useGetApi } from '../../hooks/useGetApi'
import { StyledForm } from '../ui/StyledForm/StyledForm'
import { Controller, UseFormReturn } from 'react-hook-form'
import { SingleUpdatePlayerType, TeamFormType } from '../../types'
import { ReactNode } from 'react'

type FormTypeProps = {
	children: ReactNode
	handleTeamSubmit: (data: TeamFormType) => Promise<void>
	teamForm: UseFormReturn<TeamFormType>
}
const TeamForm = ({ children, handleTeamSubmit, teamForm }: FormTypeProps) => {
	const { players } = useGetApi()
	const { register, handleSubmit, control, reset, watch, setValue } = teamForm
	const selectedPlayers = watch('updatedPlayers') || []
	const availablePlayers = players
		?.map(player => ({
			firstName: player.firstName,
			lastName: player.lastName,
			label: `${player.firstName} ${player.lastName}`,
			id: player.id,
		}))
		.filter(player => !selectedPlayers.some(selected => selected.id === player.id))

	const onSubmit = async (data: TeamFormType) => {
		console.log(data)
		await handleTeamSubmit(data)
		reset()
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<label>
				Nazwa drużyny: <input type='text' {...register('name')} />
			</label>
			<label>
				Rok założenia: <input type='number' {...register('founded')} />
			</label>
			<label>
				Lokalizacja: <input type='text' {...register('location')} />
			</label>
			<label>
				Dodaj zawodnika:
				<Controller
					name='updatedPlayers'
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							options={availablePlayers}
							isMulti
							getOptionLabel={e => e.label}
							getOptionValue={e => e.id.toString()}
							onChange={(selected: MultiValue<SingleUpdatePlayerType>) =>
								setValue('updatedPlayers', [...selected] as SingleUpdatePlayerType[])
							}
						/>
					)}
				/>
			</label>
			{children}
		</StyledForm>
	)
}

export { TeamForm }
