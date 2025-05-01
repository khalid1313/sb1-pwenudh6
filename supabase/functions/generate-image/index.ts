import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured in environment variables. Please add it in your Supabase project settings.');
    }

    const openai = new OpenAI({
      apiKey,
    });

    const formData = await req.formData();
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const n = parseInt(formData.get('n') as string) || 3;
    const size = formData.get('size') as string || '1024x1024';
    const quality = formData.get('quality') as string || 'high';

    if (!image || !(image instanceof File)) {
      throw new Error('Invalid or missing image file. Please upload a valid image.');
    }

    if (!prompt) {
      throw new Error('Prompt is required. Please provide a description for the image generation.');
    }

    // Convert the image to base64
    const imageArrayBuffer = await image.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)));

    try {
      const response = await openai.images.edit({
        image: Buffer.from(base64Image, 'base64'),
        prompt,
        n,
        size,
        quality,
      });

      return new Response(
        JSON.stringify({ 
          success: true,
          data: response.data
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      throw new Error(`OpenAI API Error: ${openaiError.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: error.stack
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});