import z from 'zod';

const projectSchema = z.object({
	project_type_uid: z.number({
		invalid_type_error:'Project type must be a number',
	}).int(),
	project_user_creator_uid: z.number({
			invalid_type_error:'Project user creator must be a number',
			required_error:'Project user creator is required'
		}).int(),
	project_name: z.string().max(255, {
		"message": "Project name must be less than 255 characters"
	}),
	project_start_date: z.string({
		invalid_type_error:'Project start date must be a string'
	}),
	project_deadline: z.string({
		
	}),
	user_uid: z.array(z.number({
		invalid_type_error:'User uid must be an array of numbers',
	}).int(),{
		invalid_type_error:'User uid must be an array of numbers'
	}),
	project_state: z.string({
		invalid_type_error: 'Project state must be a String red, yellow, or green',
	}).refine(value => ['red', 'yellow', 'green'].includes(value), {
    message: 'Project state must be red, yellow, or green',
  })
})

export function validateProject(input){
	return projectSchema.safeParse(input)
}

let dataProject = {
		project_type_uid:1,
    project_user_creator_uid: 2,
    project_name: "ProjectTest2",
    project_start_date: "2019-01-01",
    project_deadline:"2023-12-24 10:30:00",
    user_uid:[1,2],
		project_state:"yellow"
}

let dataProject2 = {
		sql_yection:"From user get all",
		project_type_uid:1,
    project_user_creator_uid: 2,
    project_name: "ProjectTest2",
    project_start_date: "2019-01-01",
    user_uid:[1,2],
		project_state:"yellow"
}


// const smallSchema = z.object({
// 	a: z.string(),
// 	b: z.number().int(),
// });

// const mySchema = z.string();

//console.log(smallSchema.parse({ a: "hello", b: 123 })); // { a: "hello", b: 123 }

//console.log(dataProject)
const result = projectSchema.partial().safeParse(dataProject2)
console.log(result.data)