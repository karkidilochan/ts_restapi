import { object, string, TypeOf, ZodString } from "zod";

export const createUserSchema = object({
    // here we put the definition of our payload

    body: object({
        name: string(
            {
                required_error: "Please enter valid name",
            }
        ),
        email: string(
            {
                required_error: "Enter valid email"
            }
        ),
        password: string(
            {
                required_error: "Enter valid password"
            }
        ).min(6, "Password is too short"),
        confirmationPassword: string(
            {
                required_error: "Enter valid password"
            }
        )        
    }).refine(
        (data) => {
            data.password === data.confirmationPassword,
            {
                message: "passwords don't match",
                path: ['confirmationPassword']
            }
        }
    )
})

//to type user controller to tell request body what it should expect  
export type createUserInput = TypeOf<typeof createUserSchema>