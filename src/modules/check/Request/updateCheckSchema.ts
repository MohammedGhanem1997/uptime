import { z } from 'zod'
import { createCheckSchema } from './CreateRequest' 

export const updateCheckSchema = createCheckSchema.deepPartial()
