import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from './login-form'

export default async function LoginPage() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (token) {
    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (user) {
      redirect('/dashboard')
    }
  }

  return <LoginForm />
}
