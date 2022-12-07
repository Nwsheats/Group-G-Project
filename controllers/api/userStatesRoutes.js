const router = require('express').Router();
const { Users, User_states } = require('../../models');


router.get('/:id', async (req, res) => {
    try {
        const userStateData = await User_states.findOne({
            where: {id: req.params.id},
            include: [Users] 
        });
        res.status(200).json(userStateData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    try {
        const newState = await User_states.create({
            ...req.body,
            user_id: req.session.user_id,
        });  
        res.status(200).json(newState);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
