import { rest } from 'msw';

let todos = [
    {
      id: 1,
      title: "Faire les courses",
      description: "Acheter des fruits, légumes, et produits d'épicerie",
      completed: false,
    },
    {
      id: 2,
      title: "Réparer la porte",
      description: "La porte du garage doit être réparée",
      completed: false,
    },
    {
      id: 3,
      title: "Appeler le dentiste",
      description: "Prendre un rendez-vous pour le contrôle annuel",
      completed: true,
    },
  ];
  

export const handlers = [
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.json(todos));
  }),

  rest.post('/todos', (req, res, ctx) => {
    const newTodo = req.body as any;
    todos = [newTodo, ...todos];
    return res(ctx.json(newTodo));
  }),

  rest.put('/todos/:id', (req, res, ctx) => {
    const todoId = parseInt(req.params.id as string,10);
    const updatedTodo = req.body as any;
    todos = todos.map((todo) => (todo.id === todoId ? updatedTodo : todo));
    return res(ctx.json(updatedTodo));
    }),
    ];
