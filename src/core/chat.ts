/* eslint-disable @typescript-eslint/no-explicit-any */
interface TypeData {
	// 👇️ key      value
	[key: string]: any
}

import { EventEmitter } from 'node:events'
import fetch from 'node-fetch'

class chat extends EventEmitter {

	private readonly URL = 'https://api.twitch.tv/helix/chat/'

	constructor() {
		super()
		//this.listener()
	}

	async sendFetch(endpoint: string, data: TypeData = {}) {

		if (typeof endpoint !== 'string') return new Error('The access point has to be a string')
		if (!endpoint.length) return new Error('Access point cannot be empty')

		const broadcaster_id = ''
		const moderator_id = ''
		const authorization = ''
		const options =
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${authorization}`,
				'Client-Id': '',
				'Content-Type': 'application/json'
			}
		}

		const url = `${this.URL}${endpoint}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`

		const response = await fetch(url, options)

		if (response.status !== 200) return console.log('status', response.status)

		const json = await response.json()

		return json
	}

	private listener() {
		//
		console.log('listenre')
		this.sendFetch('announcements')
	}
}

export default chat