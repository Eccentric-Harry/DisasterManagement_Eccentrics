const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Disaster = require('../models/Disaster');
const Resource = require('../models/Resource');
const Report = require('../models/Report');
const authenticateJWT = require('../middleware/verifyJWT');

router.get('/:disasterId/download', authenticateJWT,async (req, res) => {
    try {
        const disaster = await Disaster.findById(req.params.disasterId);
        const resources = await Resource.find({ disaster: req.params.disasterId });
        const reports = await Report.find({ disaster: req.params.disasterId });

        if (!disaster) {
            return res.status(404).send({ message: 'Disaster not found' });
        }

        const doc = new PDFDocument();
        let buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffer);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${disaster.disasterType}.pdf`,
            });
            res.end(pdfData);
        });

        // Title
        doc.fontSize(25).text(`Disaster Type: ${disaster.disasterType}`, {
            align: 'center',
            underline: true,
        });

        // Details Section
        doc.moveDown().fontSize(18).text(`Details:`, { underline: true });
        doc.fontSize(12).text(`Severity: ${disaster.severity}`);
        doc.text(`Description: ${disaster.description}`);
        if (disaster.formattedAddress) {
            doc.text(`Location: ${disaster.formattedAddress}`);
        }

        // Resources Section
        doc.moveDown(2).fontSize(18).text('Resources Allocated:', { underline: true });
        resources.forEach(resource => {
            doc.fontSize(12).text(`Vehicle: ${resource.vehicle}`);
            doc.text(`Personnel: ${resource.personnel}`);
            doc.text(`Equipment: ${resource.equipment}`);
            doc.text(`Supplies: ${resource.supplies}`);
            doc.text(`Facilities: ${resource.facilities}`);
            doc.moveDown(0.5); // Adjust spacing as needed
        });

        // Reports Section
        doc.moveDown(2).fontSize(18).text('Reports:', { underline: true });
        reports.forEach(report => {
            doc.fontSize(12).text(`Title: ${report.title}`);
            doc.text(`Description: ${report.description}`);
            doc.moveDown(0.5); // Adjust spacing as needed
        });

        // Finalize the PDF
        doc.end();


    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;