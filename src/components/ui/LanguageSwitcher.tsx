'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/buttons/Button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher({ isMultiLangEnabled }: { isMultiLangEnabled: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  if (!isMultiLangEnabled) return null;

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"
      onClick={() => router.replace(pathname, { locale: locale === 'en' ? 'es' : 'en' })}
      title="Switch Language"
    >
      <Languages className="h-4 w-4" />
      {locale === 'en' ? 'EN' : 'ES'}
    </Button>
  )
}
