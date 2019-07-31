API ENDPOINTS

USERS ENDPOINTS



`http://localhost:3000/api/v1/users`

Method `POST`

@desc create new user

@params `username, gender`



`localhost:3000/api/v1/users/update-username`

Method `PUT`

@desc update username

@params `id, username,`



`http://localhost:3000/api/v1/users`

Method `GET`

@desc get users by options

@query_params `username(1|0), sortBy, whereFieldName, whereValue`



TASKS ENDPOINTS


`http://localhost:3000/api/v1/tasks`

Method `POST`

@desc create new task

@params `title, text`



`http://localhost:3000/api/v1/tasks/update`

Method `PUT`

@desc update task status

@params `id, completed(true|false)`

`http://localhost:3000/api/v1/tasks/delete-completed`



Method `PUT`

@desc delete all completed tasks

@params `n/a`



`http://localhost:3000/api/v1/tasks/sorted-uncompleted-tasks`

Method `GET`

@desc get all uncompleted tasks

@params `n/a`
