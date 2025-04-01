export type SinglePlayerType = {
	id: number
	firstName: string
	lastName: string
	teamId: number
}
export type SingleTeamType = {
	id: number
	name: string
	founded: number
	location: string
}
export type SingleGameType = {
	id: string
	title: string
	date: string
	location: string
	duration: string
	score: string
	team1Id: number
	team2Id: number
}
export type SingleAddGameType = {
	title: string
	date: string
	location: string
	duration: string
	score: string
	team1Id: number
	team2Id: number
}
export type SingleAddPlayerType = {
	firstName: string
	lastName: string
	teamId: number
}
export type SingleAddTeamType = {
	name: string
	founded: number
	location: string
}
export type SingleUpdatePlayerType = {
	firstName: string
	lastName: string
	label: string
	id: number
}
export type SingleAddTeamToCompetitionType = {
	name: string
	label: string
	id: number
}
export type TeamFormType = SingleTeamType & { updatedPlayers: SingleUpdatePlayerType[] }

export type CompetitionFormType = SingleGameType & { teamCompetition: SingleAddTeamToCompetitionType[] }
