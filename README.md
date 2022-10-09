# twichat
 Manage all the events that occur in your twitch direct

# It is currently under development. Next release scheduled for October 17, 2022

## How to use this module?

```javascript

// Code example:

const twichat = core.init({
	client_id,
	client_secret
})

twichat.on('ready', async () => {

	console.log('The js-twichat module already allows you to send events')

	const user = await twichat.getInfoUser('jscode_')

	console.log(user)
})


```

## Events list
|Event                	| Definition                          |
|----------------	|-------------------------------|
|ready				| The js-twichat module already allows you to send events           |
|message          	| Listen to all chat messages            |
|error          	| Js-twichat errors|
|warning          	| Js-twichat warnings|

## Method list
|Method                	| Definition                          |
|----------------	|-------------------------------|
|getInfoUser				| Get data from a user           |
|getChannelById          	| Get channel data by ID            |