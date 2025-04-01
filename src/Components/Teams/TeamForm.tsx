import Select, { MultiValue } from 'react-select'
import { useGetApi } from '../../hooks/useGetApi'
import { StyledForm } from '../ui/StyledForm/StyledForm'
import { Controller, UseFormReturn } from 'react-hook-form'
import { SingleUpdatePlayerType, TeamFormType } from '../../types'
import { ReactNode } from 'react'
import { StyledError } from '../ui/StyledError/StyledError'

type FormTypeProps = {
	children: ReactNode
	handleTeamSubmit: (data: TeamFormType) => Promise<void>
	teamForm: UseFormReturn<TeamFormType>
}
const TeamForm = ({ children, handleTeamSubmit, teamForm }: FormTypeProps) => {
	const { players } = useGetApi()
	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = teamForm
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
		await handleTeamSubmit(data)
		reset()
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<label>
				Nazwa drużyny:{' '}
				<input
					type='text'
					{...register('name', {
						required: 'To pole jest wymagane',
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: 'Tylko litery od A do Z',
						},
					})}
				/>
				{errors.name && <StyledError>{errors.name.message}</StyledError>}
			</label>
			<label>
				Rok założenia:{' '}
				<input
					type='number'
					{...register('founded', {
						required: 'To pole jest wymagane',
						pattern: {
							value: /^[1-9][0-9]{0,3}$/,
							message: 'Liczba nie może się zaczynać 0 i max 4 liczby',
						},
					})}
				/>
				{errors.founded && <StyledError>{errors.founded.message}</StyledError>}
			</label>
			<label>
				Lokalizacja:{' '}
				<input
					type='text'
					{...register('location', {
						required: 'To pole jest wymagane',
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: 'Tylko litery od A do Z',
						},
					})}
				/>
				{errors.location && <StyledError>{errors.location.message}</StyledError>}
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
