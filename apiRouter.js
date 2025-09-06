import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
} from './routes/apiController.js';  // Update this path

const router = express.Router();

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Profile routes
router.get('/profiles', getAllProfiles);
router.get('/profiles/:id', getProfileById);
router.post('/profiles', createProfile);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);

export default router;