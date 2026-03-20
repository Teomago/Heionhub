import { getCachedGlobal } from '@/modules/common/data'
import type { Media, SiteSetting } from '@/payload-types'
import { LoginForm } from './LoginForm'

export default async function LoginPage() {
  const settings = await getCachedGlobal<SiteSetting>('site-settings', 1)

  const image = settings.loginCoverImage
  const coverImageUrl =
    image && typeof image === 'object' ? (image as Media).url ?? null : null

  const isMultiLangEnabled = settings.enableMultiLanguage !== false

  return <LoginForm coverImageUrl={coverImageUrl} isMultiLangEnabled={isMultiLangEnabled} />
}
