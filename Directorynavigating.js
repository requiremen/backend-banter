import path ,{dirname} from 'path'
import { fileURLToPath } from 'url';
//get the filepath from the url of the current module
// basically helps us to navigate the folder directory we have in our project
const __filename = fileURLToPath(import.meta.url)
//get the directory from the file path 
//so this is basically doing the stuff of of finding the file 
const __dirname = dirname(__filename)
// this code helps us to navigate to the html file
res.sendfile(path.join(__dirnmae,"public","index.html"))
