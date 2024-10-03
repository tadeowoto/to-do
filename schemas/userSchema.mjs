// userSchema.mjs
import { z } from 'zod'

// Define el esquema de validación para un usuario
export const userSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres').max(20, 'El nombre de usuario no puede tener más de 20 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100, 'La contraseña no puede tener más de 100 caracteres')
})
