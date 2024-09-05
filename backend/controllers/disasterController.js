const Disaster = require('../models/Disaster');

const reportDisaster = async(req, res) => {
    const { reportedat, disasterType, description, severity, image, locationType, locationCoordinates } = req.body;

    const location = {
        type: locationType,
        coordinates: JSON.parse(locationCoordinates)
    };

    if(!location ||!reportedat ||!disasterType ||!description ||!severity) {
        return res.status(400).json({message: 'All fields are required'});
    }

    try {
        const newDisaster = new Disaster({
            user: req.user,
            location: {
                type: 'Point',
                coordinates: location.coordinates
            },
            reportedat,
            disasterType,
            description,
            severity,
            image
        });

        await newDisaster.save();
            
        res.status(201).json({message: 'Disaster reported'});
    } catch(err) {
        res.status(500).json({message: 'Server Error'});
    }
};

const getDisasters = async(req, res) => {
    try {
        const disasters = await Disaster.find();
        res.json(disasters);
    } catch (err) {
        res.status(500).json({message: 'Server Error',error:err.message});
    }
};

const getDisasterById = async(req, res) => {
    try {
        const disaster = await Disaster.findById(req.params.id);
        if(!disaster) {
            return res.status(404).json({message: 'Disaster not found'});
        }
        res.json(disaster);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
}


const getUserDisasters = async(req, res) => {
    try {
        const userId = req.params.userId;
        const disasters = await Disaster.find({ user: userId });
        res.json(disasters);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
}

const updateDisaster = async(req, res) => {
    try {
        const disaster = await Disaster.findById(req.params.id);
        if(!disaster) {
            return res.status(404).json({message: 'Disaster not found'});
        }

        if(req.body.reportedat) {
            disaster.reportedat = req.body.reportedat;
        }
        if(req.body.disasterType) {
            disaster.disasterType = req.body.disasterType;
        }
        if(req.body.description) {
            disaster.description = req.body.description;
        }
        if(req.body.severity) {
            disaster.severity = req.body.severity;
        }
        if(req.body.image) {
            disaster.image = req.body.image;
        }
        if(req.body.locationType) {
            disaster.location.type = req.body.locationType;
        }
        if(req.body.locationCoordinates) {
            disaster.location.coordinates = JSON.parse(req.body.locationCoordinates);
        }

        await disaster.save();
        res.json({message: 'Disaster updated'});
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {
    reportDisaster,
    getDisasters,
    getDisasterById,
    getUserDisasters,
    updateDisaster
};
    