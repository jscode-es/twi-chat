/* eslint-disable @typescript-eslint/no-explicit-any */
import camelize from './camelcase'

class parseData {
	static message(data: string) {

		const message = {
			raw: data,
			tags: {},
			prefix: null,
			command: null,
			params: []
		}

		// Position and nextspace are used by the parser as a reference
		let position = 0
		let nextspace = 0

		// The first thing we check for is IRCv3.2 message tags.
		// https://ircv3.net/specs/extensions/message-tags

		if ((data as any).charCodeAt(0) === 64) {

			nextspace = data.indexOf(' ')

			// Malformed IRC message
			if (nextspace === -1) {
				return null
			}

			// Tags are split by a semi colon
			const rawTags = data.slice(1, nextspace).split(';')

			for (let i = 0; i < rawTags.length; i++) {
				// Tags delimited by an equals sign are key=value tags.
				// If there's no equals, we assign the tag a value of true.
				const tag = rawTags[i]

				if (!tag) continue

				const pair = tag.split('=')

				if (!pair) continue

				const select = pair[0]

				if (select === undefined) continue

				(message as any).tags[camelize(select)] = tag.slice(tag.indexOf('=') + 1) || true
			}

			position = nextspace + 1
		}

		// Skip any trailing whitespace
		while (data.charCodeAt(position) === 32) {
			position++
		}

		// Extract the message's prefix if present. Prefixes are prepended with a colon
		if (data.charCodeAt(position) === 58) {
			nextspace = data.indexOf(' ', position)

			// If there's nothing after the prefix, deem this message to be malformed.
			if (nextspace === -1) {
				return null
			}

			(message as any).prefix = data.slice(position + 1, nextspace)
			position = nextspace + 1

			// Skip any trailing whitespace
			while (data.charCodeAt(position) === 32) {
				position++
			}
		}

		nextspace = data.indexOf(' ', position)

		// If there's no more whitespace left, extract everything from the
		// current position to the end of the string as the command
		if (nextspace === -1) {
			if (data.length > position) {
				(message as any).command = data.slice(position)
				return message
			}
			return null
		}

		// Else, the command is the current position up to the next space. After
		// that, we expect some parameters.
		(message as any).command = data.slice(position, nextspace)

		position = nextspace + 1

		// Skip any trailing whitespace
		while ((data as any).charCodeAt(position) === 32) {
			position++
		}

		while (position < data.length) {
			nextspace = data.indexOf(' ', position)

			// If the character is a colon, we've got a trailing parameter.
			// At this point, there are no extra params, so we push everything
			// from after the colon to the end of the string, to the params array
			// and break out of the loop.
			if ((data as any).charCodeAt(position) === 58) {
				(message as any).params.push(data.slice(position + 1))
				break
			}

			// If we still have some whitespace.
			if (nextspace !== -1) {
				// Push whatever's between the current position and the next
				// space to the params array.
				(message as any).params.push(data.slice(position, nextspace))
				position = nextspace + 1

				// Skip any trailing whitespace and continue looping.
				while ((data as any).charCodeAt(position) === 32) {
					position++
				}

				continue
			}

			// If we don't have any more whitespace and the param isn't trailing,
			// push everything remaining to the params array.
			if (nextspace === -1) {
				(message as any).params.push(data.slice(position))
				break
			}
		}
		return message
	}
}

export default parseData