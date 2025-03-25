import styled from 'styled-components'
import { useGetApi } from '../../../hooks/useGetApi'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { SingleAddPlayerType } from '../../../types'
import { StyledButton } from '../../ui/StyledButton/StyledButton'
import { StyledForm } from '../../ui/StyledForm/StyledForm'

const Error = styled.p`
	font-size: 10px;
	color: red;
	padding: 0;
	margin: 0;
	text-align: center;
`
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
				{errors.firstName && <Error>{errors.firstName.message}</Error>}
			</label>
			<label>
				Nazwisko:
				<input type='text' {...register('lastName', inputOptions)} />
				{errors.lastName && <Error>{errors.lastName.message}</Error>}
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
