import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY, BASE_RATE_MEDIUM_COST } from './config.js';
import { IMAGE_EDIT_PROMPT } from './systemPrompt.js';

const openai = new OpenAIApi(new Configuration({
  apiKey: OPENAI_API_KEY
}));

/**
 * Applies edits to the provided image buffer using the GPT-Image-1 endpoint,
 * and computes cost based on image dimensions.
 * @param {Buffer} buffer - The original image data.
 * @param {string} prompt - User instructions for editing.
 * @param {string} [size='1024x1024'] - Desired output dimensions.
 * @returns {Promise<Array<{url: string, cost: number}>>}
 */
export async function editImage(buffer, prompt, size = '1024x1024') {
  const response = await openai.images.createEdit({
    image: buffer,
    prompt: `${IMAGE_EDIT_PROMPT}\nUser: ${prompt}`,
    size
  });

  // Calculate cost: BASE_RATE_MEDIUM_COST per 1024x1024 px
  const [widthStr, heightStr] = size.split('x');
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);
  const area = width * height;
  const cost = BASE_RATE_MEDIUM_COST * (area / (1024 * 1024));

  return response.data.map(item => {
    const url = item.url || `data:image/png;base64,${item.b64_json}`;
    return { url, cost: Number(cost.toFixed(4)) };
  });
}
