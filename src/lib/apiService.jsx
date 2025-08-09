import axios from 'axios';

// Create an axios instance for your API routes.
// The baseURL is set to '/api', which Next.js will correctly route.
const localApi = axios.create({
    baseURL: '/api'
});

// --- Service Functions ---

/**
 * Compresses an image to a specified quality.
 * @param {FormData} formData Contains the file and quality level.
 * @returns {Promise<Blob>} A promise that resolves to the compressed image blob.
 */
export const compressImage = async (formData) => {
    try {
        const response = await localApi.post('/compress/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'Image compression failed.');
    }
};

/**
 * Compresses a PDF file by re-compressing its internal images.
 * @param {FormData} formData Contains the PDF file and quality level.
 * @returns {Promise<Blob>} A promise that resolves to the compressed PDF blob.
 */
export const compressPdf = async (formData) => {
    try {
        const response = await localApi.post('/compress/pdf', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'PDF compression failed.');
    }
};

/**
 * Converts a single image to a different format.
 * @param {FormData} formData Contains the file and target format.
 * @returns {Promise<Blob>} A promise that resolves to the converted image blob.
 */
export const convertImage = async (formData) => {
    try {
        const response = await localApi.post('/convert/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'Image conversion failed.');
    }
};

/**
 * Converts multiple images into a single PDF.
 * @param {FormData} formData Contains the image files.
 * @returns {Promise<Blob>} A promise that resolves to the PDF blob.
 */
export const convertImagesToPdf = async (formData, onUploadProgress) => {
    try {
        const response = await localApi.post('/convert/image-to-pdf', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
            onUploadProgress, // Pass the callback to axios
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'Image to PDF conversion failed.');
    }
};

/**
 * Converts a PDF into a ZIP file of images.
 * @param {FormData} formData Contains the PDF file and target format.
 * @returns {Promise<Blob>} A promise that resolves to the ZIP file blob.
 */
export const convertPdfToImages = async (formData) => {
    try {
        const response = await localApi.post('/convert/pdf-to-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'PDF to Image conversion failed.');
    }
};

/**
 * Generates an image using an external AI model.
 * NOTE: This function calls an external URL and does not use the localApi instance.
 * @param {string} prompt The text prompt for the AI.
 * @returns {Promise<string>} A promise that resolves to the base64 data URL of the image.
 */
export const generateAiImage = async (prompt) => {
    try {
        const payload = {
            instances: [{ prompt }],
            parameters: { "sampleCount": 1 }
        };
        
        // In Next.js, API keys should be stored in environment variables.
        // Create a .env.local file and add: NEXT_PUBLIC_GEMINI_API_KEY=your_key
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        const response = await axios.post(apiUrl, payload);
        
        const predictions = response.data.predictions;
        if (predictions && predictions.length > 0 && predictions[0].bytesBase64Encoded) {
            return `data:image/png;base64,${predictions[0].bytesBase64Encoded}`;
        } else {
            throw new Error('API did not return a valid image.');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        throw new Error(errorMessage || 'AI image generation failed.');
    }
};
