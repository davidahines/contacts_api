import app from  './server';

const port = process.env.PORT || 3000;
app.listen(port);
// tslint:disable-next-line:no-console
console.log('Contacts Api server started on: ' + port);
