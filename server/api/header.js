export default defineEventHandler(async () => {
  try {
    return await $fetch(
      'https://admin.dspcrm.com/wp-json/custom/v1/Header',
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('WordPress API Error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch header data'
    })
  }
})