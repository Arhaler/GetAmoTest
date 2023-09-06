import Express from 'express';
import ContactsController from './controllers/contactsController.js';
import AmoController from './controllers/amoController.js';
import path from 'path';
import { fileURLToPath } from 'url';
const port = 3010;
const app = Express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(Express.static(path.join(__dirname, '../../frontend')));
app.use(ContactsController);
app.use(AmoController);
app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});
//# sourceMappingURL=main.js.map