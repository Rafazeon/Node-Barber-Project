import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body
    const createUser = new CreateUserService()

    const user = await createUser.excecute({
        name,
        email,
        password
    })

    return response.json(user)
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
        user_id: 'de917498-addc-4ca7-a0ed-876cf679c50b',
        avatarFilename: request.file.filename
    })

    return response.json({ user })
})

export default usersRouter