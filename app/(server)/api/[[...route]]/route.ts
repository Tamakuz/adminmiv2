import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { postUser } from '../../services/users/postUser'
import { getUser } from '../../services/users/getUser'
import { superAdmin } from '../../middlewares/superAdmin'
import { getUserById } from '../../services/users/getUserById'
import { putRoleStatus } from '../../services/users/putRoleStatus'
import { deleteUser } from '../../services/users/deleteUser'
import { postMahasiswa } from '../../services/mahasiswas/postMahasiswa'
import { getMahasiswa } from '../../services/mahasiswas/getMahasiswa'
import { getMahasiswaById } from '../../services/mahasiswas/getMahasiswaById'
import { putMahasiswa } from '../../services/mahasiswas/putMahasiswa'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

app.post('/user', postUser)
app.get('/user', getUser)
app.get('/user/:id', getUserById)
app.put('/user/role-status/:id', superAdmin, putRoleStatus)
app.delete('/user/:id', superAdmin, deleteUser)

app.post('/mahasiswa', postMahasiswa)
app.get('/mahasiswa', getMahasiswa)
app.get('/mahasiswa/:id', getMahasiswaById)
app.put('/mahasiswa/:id', putMahasiswa)
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

