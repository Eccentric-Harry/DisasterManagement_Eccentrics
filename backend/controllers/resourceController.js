const Resource = require('../models/Resource');
const Disaster = require('../models/Disaster');

const createResource = async(req, res) => {
    console.log(req.params);
    // const disasterId = req.params.id;
    const disasterId = req.params.disasterId;
    const {vehicle, personnel, equipment, supplies, facilities} = req.body;

    console.log(`Received request to allocate resources for Disaster ID: ${disasterId}`);
    console.log(req.body);

    try{
        const newResource = new Resource({
            disaster: disasterId,
            vehicle,
            personnel,
            equipment,
            supplies,
            facilities
        });

        await newResource.save();

        res.status(200).json({message: 'Resources allocated'});
    } catch(err) {
        res.status(500).json({message: 'Server Error'});
    }
};

const getResourcesByDisaster = async(req, res) => {
    const disasterId = req.params.disasterId;

    try {
        const resources = await Resource.find({ disaster: disasterId });
        res.json(resources);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {
    createResource,
    getResourcesByDisaster
};