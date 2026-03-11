import { getPayload } from 'payload'
import config from '@payload-config'
import InvitationGate from '@/components/InvitationGate'

export default async function JoinPage() {
  const payload = await getPayload({ config })

  const invitationsGlobal = await payload.findGlobal({
    slug: 'invitations',
  })

  return (
    <InvitationGate
      globals={{
        title: invitationsGlobal.title,
        subtitle: invitationsGlobal.subtitle,
      }}
    />
  )
}
