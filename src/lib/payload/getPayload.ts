import config from '@payload-config'
import { getPayload as getPayloadFn } from 'payload'

export const getPayload = () => getPayloadFn({ config })
