/* eslint-disable @typescript-eslint/no-explicit-any */
import core from './core'

// Loading Node JS modules
import path from 'path'

// Module external
import dotenv from 'dotenv'

// Prepare file dotenv
const fileEnv = '.env.dev'
const pathEnv = path.resolve(__dirname, '..', fileEnv)

// Initialize configuration
dotenv.config({ path: pathEnv })


const { CLIENT_ID, CLIENT_SECRET } = process.env

// Pre testing
const twichat = core.init({
	client_id: CLIENT_ID,
	client_secret: CLIENT_SECRET
})

twichat.on('ready', async () => {

	console.log('ready')

	const user = await twichat.getInfoUser('jscode_')

	console.log(user)
})


export default core