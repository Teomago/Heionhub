import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import { Card, CardContent } from '@/components/display/Card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import type { TeamBlockType, Media } from '@/payload/payload-types'

type TeamBlockProps = Omit<TeamBlockType, 'blockType' | 'blockName'>
type MemberData = NonNullable<TeamBlockType['members']>[number]

const platformIcons: Record<string, string> = {
  linkedin: 'in',
  twitter: '𝕏',
  github: 'GH',
  instagram: 'IG',
  website: '🌐',
}

/**
 * Team block component.
 * Renders a grid of team members with photo, name, role, bio, and social links.
 */
export function TeamBlock({ heading, subheading, members, design }: TeamBlockProps) {
  if (!members || members.length === 0) return null

  const columns = design?.columns || '3'

  return (
    <div className="flex flex-col gap-8">
      {(heading || subheading) && (
        <div className="text-center">
          {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
          {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div
        className={cn(
          'grid gap-6',
          columns === '2' && 'sm:grid-cols-2',
          columns === '3' && 'sm:grid-cols-2 lg:grid-cols-3',
          columns === '4' && 'sm:grid-cols-2 lg:grid-cols-4',
        )}
      >
        {members.map((member, index) => (
          <TeamMemberCard key={member.id || index} member={member} />
        ))}
      </div>
    </div>
  )
}

function TeamMemberCard({ member }: { member: MemberData }) {
  const photo = member.photo as Media | null | undefined
  const initials = member.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <Avatar size="lg" className="h-24 w-24">
          {photo?.url ? <AvatarImage src={photo.url} alt={member.name} /> : null}
          <AvatarFallback className="text-lg">{initials || '?'}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{member.name}</h3>
          {member.role && <p className="text-sm text-muted-foreground">{member.role}</p>}
        </div>

        {member.bio && (
          <div className="text-sm">
            <RichText data={member.bio} enableProse enableGutter={false} />
          </div>
        )}

        {member.socialLinks && member.socialLinks.length > 0 && (
          <div className="flex gap-2">
            {member.socialLinks.map((social, idx) => (
              <Link
                key={social.id || idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                title={social.platform}
              >
                {platformIcons[social.platform] || social.platform}
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
