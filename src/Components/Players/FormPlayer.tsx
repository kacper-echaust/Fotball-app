import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { useGetApi } from '../../hooks/useGetApi'
import { SingleAddPlayerType } from '../../types'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { StyledForm } from '../ui/StyledForm/StyledForm'
import { StyledError } from '../ui/StyledError/StyledError'

type FormPlayerProps = {
	formPlayer: UseFormReturn<SingleAddPlayerType>
	onSubmit: SubmitHandler<SingleAddPlayerType>
	submitButtonText: 'Dodaj zawodnika' | 'Potwierdź zmianę'
}
const FormPlayer = ({ formPlayer, onSubmit, submitButtonText }: FormPlayerProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = formPlayer
	const { teams } = useGetApi()
	const inputOptions = {
		required: 'To pole jest wymagane',
		pattern: {
			value: /^[a-zA-Z]+$/,
			message: 'Tylko litery od A do Z',
		},
	}
	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h3>Dodaj zawodnika</h3>
			<label>
				Imię:
				<input type='text' {...register('firstName', inputOptions)} />
				{errors.firstName && <StyledError>{errors.firstName.message}</StyledError>}
			</label>
			<label>
				Nazwisko:
				<input type='text' {...register('lastName', inputOptions)} />
				{errors.lastName && <StyledError>{errors.lastName.message}</StyledError>}
			</label>
			<label>
				Drużyna:
				<select {...register('teamId')}>
					<option value={0}>Brak</option>
					{teams?.map(team => {
						return (
							<option key={team.id} value={team.id}>
								{team.name}
							</option>
						)
					})}
				</select>
			</label>
			<StyledButton type='submit'>{submitButtonText}</StyledButton>
		</StyledForm>
	)
}

export { FormPlayer }
