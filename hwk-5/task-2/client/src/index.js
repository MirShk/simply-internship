import { asyncRenderDOM } from './reduxStore';

asyncRenderDOM()
    .then(() => console.log("DOM has asynchronously been rendered successfully!"))
    .catch(err => new Error(err));


