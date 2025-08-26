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
export const convertJpegToPng = async (formData) => {
    try {
        const response = await localApi.post('/convert/jpeg-to-png', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'Image conversion failed.');
    }
};

export const convertPngToJpeg = async (formData) => {
    try {
        const response = await localApi.post('/convert/png-to-jpeg', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'Image conversion failed.');
    }
};

export const convertToWebp = async (formData) => {
    try {
        // This endpoint can point to a single, smart API route that handles different conversions.
        const response = await localApi.post('/convert/image-to-webp', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const errorText = await error.response?.data?.text();
        throw new Error(errorText || 'Image processing failed due to a network or server error.');
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
        // This now calls YOUR server, not the external Gemini API
        const response = await localApi.post('/generate-ai-image', { prompt });
        return response.data.imageUrl;
    } catch (error) {
        // Await the error response to get the text from the server
        const errorMessage = await error.response?.data || error.message;
        throw new Error(errorMessage || 'AI image generation failed.');
    }
};

export const sendContactMessage = async (formData) => {
    try {
        // We use a standard fetch call here as Axios is not strictly necessary for a simple JSON post.
        const response = await fetch('/api/resend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to send message.');
        }

        return data;
    } catch (error) {
        // Re-throw the error to be caught by the component
        throw error;
    }
};