import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
    public async index() {
       const todos= await Todo.all()
        return todos.map(todo =>todo.serialize({fields:['id','title','user']}) )
    }


    public async store({ request, response }: HttpContextContract) {
        try {
            await Todo.create({ title: request.input('title'), is_completed: false })
            return response.status(201).json({ 'created':true})
        } catch (e) {
            return response.send({ error : e})
        }
        
    }

    public async update({ request, response, params }: HttpContextContract) {
        const todo = await Todo.findByOrFail( 'id', params.id)
        todo.is_completed = request.input('is_completed')
        todo.save()
        return response.status(202).send(todo)
        
    }

    
    public async getById({ response, params }: HttpContextContract) {

        

        const todo = await Todo.find(params.id)

        //  return response.status(201).json(todo);
        if (todo) {

            return response.json({
                status:'201',
                messages: 'Todo found successfully',
                data: todo,
            })
            
        } else {

            return response.json({
                status:'500',
                messages: 'Todo not found',
                data: [],
            })

        }
    }
}
