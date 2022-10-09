const twichat = require('../dist/index').default

require('dotenv').config()

describe('Twichat', () => {

	test('Connection', async () => {
		expect(1).toBe(1)
	})

})