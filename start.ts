import app from  './server';
import logger from './src/lib/logger';

const port = process.env.PORT || 3000;
app.listen(port);
// tslint:disable-next-line:no-console
logger.debug(`Contacts Api server started on: ${port}`);
