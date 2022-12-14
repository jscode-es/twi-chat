/* eslint-disable @typescript-eslint/no-explicit-any */
import chat from './chat'
import fetch from 'node-fetch'

interface DataCnnect {
	// 👇️ key      value
	[key: string]: any
}

class fetching extends chat {

	access_token: string
	expires_in: string
	token_type: string

	constructor() {

		super()
		this.access_token = ''
		this.expires_in = ''
		this.token_type = ''
	}

	async getToken({ client_id, client_secret }: DataCnnect) {

		const options: any =
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
		}

		const url = 'https://id.twitch.tv/oauth2/token'

		const response = await fetch(url, options)

		if (response.status !== 200) return console.log('Error', response.status)

		const json = await response.json()

		this.access_token = json.access_token
		this.expires_in = json.expires_in
		this.token_type = json.token_type

		this.emit('ready')

		return json
	}

	protected async getData(endpoint: string) {

		const { CLIENT_ID } = process.env

		const options: any =
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.access_token}`,
				'Client-Id': CLIENT_ID
			},
		}

		const url = `https://api.twitch.tv/helix/${endpoint}`

		const response = await fetch(url, options)

		if (response.status !== 200) return console.log('Error', response.status)

		const json = await response.json()

		return json

	}

}

export default fetching