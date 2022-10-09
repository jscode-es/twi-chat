/* eslint-disable @typescript-eslint/no-explicit-any */
import fetching from './fetch'

interface DataCnnect {
	// 👇️ key      value
	[key: string]: any
}

class twichat extends fetching {

	constructor() {

		super()
	}

	static init(parmas: DataCnnect) {

		const handler = new twichat()

		handler.getToken(parmas)

		return handler
	}

	async getInfoUser(name: string) {
		return await this.dataFetch(`users?login=${name}`)
	}

	async getChannelById(id: string) {
		return await this.dataFetch(`channels?broadcaster_id=${id}`)
	}

}

export default twichat