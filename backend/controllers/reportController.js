const Report = require('../models/Report');

const createReport = async(req, res) => {
    const disasterId = req.params.disasterId;
    const { title, description } = req.body;

    console.log(`Received request to report disaster ID: ${disasterId}`);
    console.log(req.body);

    try{
        const newReport = new Report({
            disaster: disasterId,
            title,
            description
        });

        await newReport.save();

        res.status(200).json({message: 'Disaster report saved'});
    } catch(err) {
        res.status(500).json({message: 'Server Error'});
    }
};

const getReportsByDisaster = async(req, res) => {
    const disasterId = req.params.disasterId;

    try {
        const reports = await Report.find({ disaster: disasterId });
        res.json(reports);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {
    createReport,
    getReportsByDisaster
};