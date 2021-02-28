export const userDataGenerator = () => ({
  email: `${randomString()}@gmail.com`,
  firstName: 'Artem',
  lastName: 'Moshnin',
  password: '12345678',
})

function randomString() {
  return [...Array(10)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join('')
}
