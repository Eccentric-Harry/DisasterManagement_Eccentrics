const { format } = require('date-fns');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const fsPromises = fs.promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    
    try {
        if (!fs.existsSync(path.join(__dirname, '../logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '../logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '../logs', logFileName), logItem); 
    } catch (error) {
        console.error(error);
    }
};


const logger = async (req, res, next) => {
    await logEvents(`${req.method}\t${req.url}\t${req.ip}\t${req.headers.origin}`, 'requests.log');
    console.log(`${req.method}\t${req.path}`);
    next();
 };
 

module.exports = {logEvents,logger};
