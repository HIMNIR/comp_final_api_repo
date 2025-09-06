import express from 'express';

// User Controllers
const getAllUsers = async (req, res) => {
    try {
        const { data, error } = await req.supabase.from('users').select('*');
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await req.supabase.from('users').select('*').eq('id', id).single();
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { data, error } = await req.supabase
            .from('Users')
            .insert([req.body])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await req.supabase
            .from('Users')
            .update(req.body)
            .eq('id', id)
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await req.supabase
            .from('Users')
            .delete()
            .eq('id', id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Profile Controllers
const getAllProfiles = async (req, res) => {
    try {
        const { data, error } = await req.supabase.from('Profile').select('*');
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await req.supabase
            .from('Profile')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!data) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProfile = async (req, res) => {
    try {
        const { user_id, iswheeelchair, isblind } = req.body;
        const { data, error } = await req.supabase
            .from('Profile')
            .insert([{ user_id, iswheeelchair, isblind }])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, iswheeelchair, isblind } = req.body;
        const { data, error } = await req.supabase
            .from('Profile')
            .update({ user_id, iswheeelchair, isblind })
            .eq('id', id)
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await req.supabase
            .from('Profile')
            .delete()
            .eq('id', id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export {
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
};