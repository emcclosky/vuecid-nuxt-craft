export default (error, context) => {
  console.error(error) // eslint-disable-line
  context.error({ statusCode: 304, message: 'Server error' })
}
