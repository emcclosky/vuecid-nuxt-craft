export default (error, context) => {
  console.error('Apollo Error', error) // eslint-disable-line
  // eslint-disable-next-line no-console, prettier/prettier
  console.info('Try checking your database! Especially if you see this error:«Network error: Unexpected token < in JSON at position 4»')
  context.error({ statusCode: 304, message: 'Server error' })
}
