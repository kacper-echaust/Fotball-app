import styled from "styled-components";

const StyledButton = styled.button`
	padding: 10px 20px;
	cursor: pointer;
	border: none;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.secondary};
	border-radius: 10px;
	transition: 0.3s;
	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary};
		color: ${({ theme }) => theme.colors.primary};
	}
`
export {StyledButton}