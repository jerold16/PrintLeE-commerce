import { log } from 'console';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { productModel } from '../ModelSchema/productModel.mjs';

// Function to delete the image file from the file system
const deleteImageFromFileSystem = (filename) => {
    console.log(filename);
    const currentFilePath = fileURLToPath(import.meta.url);
    const projectRoot = path.resolve(path.dirname(currentFilePath), '../../'); // Go up two levels to reach project root
    const imagePath = path.join(projectRoot, 'static', 'images', filename);
    if (fs.existsSync(imagePath)) {
        // Attempt to delete the file
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete image file ${filename}: ${err}`);
            } else {
                console.log(`Image file ${filename} deleted successfully`);
            }
        });
    } else {
        console.log(`Image file ${filename} does not exist`);
    }
};
export const deletemiddleware=async (request,response,next)=>{
    const {params:{pid},body}=request
    const filename =body.url.slice(`${request.protocol}://${request.get('host')}/images/`.length,)
    console.log(filename);
    deleteImageFromFileSystem(filename);
    next()
}

export const deletemiddlewareQuery=async (request,response,next)=>{
    const {params:{pid}, query:{url}}=request
    const filename =url.slice(`${request.protocol}://${request.get('host')}/images/`.length,)
    console.log(filename);
    deleteImageFromFileSystem(filename);
    next()
}

export { deleteImageFromFileSystem };
