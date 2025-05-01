import { supabase } from './supabase';

interface GenerateImageOptions {
  image: File;
  prompt: string;
  n?: number;
  size?: string;
  quality?: string;
}

export async function generateCreativeImage({
  image,
  prompt,
  n = 3,
  size = "1024x1024",
  quality = "high"
}: GenerateImageOptions) {
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);
    formData.append('n', n.toString());
    formData.append('size', size);
    formData.append('quality', quality);

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Image generation failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}