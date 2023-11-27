'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type TState = {
	errors?: {
		title?: string[]
	}
	message?: string | null
}

const CreateBoard = z.object({
	title: z.string().min(3, { message: 'Min. length of 3 letters is required' }),
})

export async function create(prevState: TState, formData: FormData) {
	const validatedFields = CreateBoard.safeParse({
		title: formData.get('title'),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing fields.',
		}
	}

	const { title } = validatedFields.data

	try {
		await db.board.create({ data: { title } })
	} catch (error) {
		return {
			message: 'Database Error',
		}
	}

	revalidatePath('/organization/org_2YdM2esuigJU1uZZEWEla9pKTeD')
	redirect('/organization/org_2YdM2esuigJU1uZZEWEla9pKTeD')
}
