import { useGetApi } from '../../hooks/useGetApi'
import { StyledForm } from '../ui/StyledForm/StyledForm'
import { Controller, UseFormReturn } from 'react-hook-form'
import { SingleAddTeamToGameType } from '../../types'
import { MultiValue } from 'react-select'
import Select from 'react-select'
import { ReactNode } from 'react'
import styled from 'styled-components'

type GameFormType = {
	gameForm: UseFormReturn<GameFormType>
	children: ReactNode
	handleSubmitGame: (data: GameFormType) => Promise<void>
}
const Error = styled.p`
	font-size: 10px;
	color: red;
	padding: 0;
	margin: 0;
	text-align: center;
`
const GameForm = ({ gameForm, children, handleSubmitGame }: GameFormType) => {
	const { teams } = useGetApi()
	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = gameForm
	const selectedTeam = watch('teamGame') || []
	const avaibleTeams = teams
		?.map(team => ({
			name: team.name,
			label: team.name,
			id: team.id,
		}))
		.filter(team => !selectedTeam.some(selected => selected.id === team.id))

	const onSubmit = async (data: GameFormType) => {
		handleSubmitGame(data)
		reset()
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<label>
				Nazwa rozgrywki:{' '}
				<input
					type='text'
					{...register('title', {
						required: 'To pole jest wymagane',
					})}
				/>
				{errors.title && <Error>{errors.title.message}</Error>}
			</label>
			<label>
				Data: <input type='date' {...register('date')} />
			</label>
			<label>
				Lokalizacja:{' '}
				<input
					type='text'
					{...register('location', {
						required: 'To pole jest wymagane',
					})}
				/>
				{errors.location && <Error>{errors.location.message}</Error>}
			</label>
			<label>
				Czas trwania:{' '}
				<input
					min={1}
					max={180}
					type='text'
					{...register('duration', {
						required: 'To pole jest wymagane',
						min: { value: 1, message: 'Minimalna wartość to 1' },
						max: { value: 180, message: 'Minimalna wartość to 180' },
						pattern: {
							value: /^[1-9][0-9]?$|^180$/,
							message: 'Wpisz liczbę od 1 do 180',
						},
					})}
				/>
				{errors.duration && <Error>{errors.duration.message}</Error>}
			</label>
			<label>
				Wynik:{' '}
				<input
					type='text'
					{...register('score', {
						required: 'To pole jest wymagane',
						pattern: {
							value: /^(0[0-7][0-9]|[1-9][0-9]?|20)-(0[0-7][0-9]|[1-9][0-9]?|20)$/,
							message: 'Wpisz zakres w formacie np. 1-2 (0-20)',
						},
					})}
				/>
				{errors.score && <Error>{errors.score.message}</Error>}
			</label>
			<label>
				Dodaj drużyny:
				<Controller
					name='teamGame'
					control={control}
					rules={{
						validate: value => (value && value.length === 2 ? true : 'Wybierz dwie drużyny'),
					}}
					render={({ field }) => (
						<Select
							{...field}
							options={avaibleTeams}
							isMulti
							getOptionLabel={e => e.label}
							getOptionValue={e => e.id.toString()}
							onChange={(selected: MultiValue<SingleAddTeamToGameType>) => {
								if (selected.length <= 2) {
									setValue('teamGame', selected as SingleAddTeamToGameType[])
								}
							}}
						/>
					)}
				/>
				{errors.teamGame && <Error>{errors.teamGame.message}</Error>}
			</label>
			{children}
		</StyledForm>
	)
}

export { GameForm }
