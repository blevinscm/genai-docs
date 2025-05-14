---
date_scraped: 2025-05-12
title: Vertex Ai Video Generation Prompt Guide
---

# Vertex AI video generation prompt guide 

This guide provides examples of the types of videos that you can create using
Veo and shows you how to modify specific parts of a prompt to produce different
results.

## Prompt guide overview

Vertex AI Veo is a text-to-video and image-to-video generation model. To
use Veo, you must provide a prompt which is a text description of what you want
your generative AI model to generate.

## Safety filters

Veo applies safety filters across Vertex AI to help ensure that
generated videos and uploaded photos don't contain offensive content. For
example, prompts that violate [responsible AI
guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai) are blocked.

If you suspect abuse of Veo or any generated output that contains inappropriate
material or inaccurate information, use the [Report suspected abuse on
Google Cloud
form](https://support.google.com/code/contact/cloud_platform_report).

## Basics for writing prompts

Good prompts are descriptive and clear. To get your generated video closer to
what you want, start with identifying your core idea and then refine your idea
by adding keywords and modifiers.

The following elements should be included in your prompt:

1. **Subject**: The object, person, animal, or scenery that you want in your
 video.
2. **Context**: The background or context in which the subject is placed.
3. **Action**: What the subject is doing (for example, walking, running, or turning their
 head).
4. **Style**: This can be general or very specific. Consider using specific film
 style keywords, such as *horror film*, *film noir*, or animated styles like
 *cartoon* style render.
5. **Camera motion**: Optional: What the camera is doing, such as aerial view,
 eye-level, top-down shot, or low-angle shot.
6. **Composition**: Optional: How the shot is framed, such as wide shot,
 close-up, or extreme close-up.
7. **Ambiance**: Optional: How the color and light contribute to the scene, such
 as blue tones, night, or warm tones.

## Examples of prompts and generated output

This section presents several prompts and how the level of detail provided in
each prompt lets you get closer to what you want in your video.

### Icicles

This video demonstrates how you can use each of the elements in your prompt.

| **Prompt** | **Generated output** |
| --- | --- |
| Close up shot (composition) of melting icicles (subject) on a frozen rock wall (context) with cool blue tones (ambiance), zoomed in (camera motion) maintaining close-up detail of water drips (action). | |

### Man on the phone

These videos demonstrate how you can revise your prompt with more specific
details about the video that you want Veo to generate.

| **Prompt** | **Generated output** | **Analysis** |
| --- | --- | --- |
| The camera dollies to show a close up of a desperate man in a green trench coat that's making a call on a rotary-style wall phone with a green neon light and a movie scene. | | This is the first generated video based on the prompt. |
| A close-up cinematic shot follows a desperate man in a weathered green trench coat as he dials a rotary phone mounted on a gritty brick wall, bathed in the eerie glow of a green neon sign. The camera dollies in, revealing the tension in his jaw and the desperation etched on his face as he struggles to make the call. The shallow depth of field focuses on his furrowed brow and the black rotary phone, blurring the background into a sea of neon colors and indistinct shadows, creating a sense of urgency and isolation. | | A more detailed prompt results in a video that is more focused with a richer environment. |
| A video with smooth motion that dollies in on a desperate man in a green trench coat, using a vintage rotary phone against a wall bathed in an eerie green neon glow. The camera starts from a medium distance, slowly moving closer to the man's face, revealing his frantic expression and the sweat on his brow as he urgently dials the phone. The focus is on the man's hands, his fingers fumbling with the dial as he desperately tries to connect. The green neon light casts long shadows on the wall, adding to the tense atmosphere. The scene is framed to emphasize the isolation and desperation of the man, highlighting the stark contrast between the vibrant glow of the neon and the man's grim determination. | | Adding more detail gave the subject a realistic expression and created an intense and vibrant scene. |

### Snow leopard

This prompt demonstrates the output that Veo might generate.

| **Prompt** | **Generated output** |
| --- | --- |
| A cute creature with snow leopard-like fur is walking in winter forest, 3D cartoon style render. | |

### Running snow leopard

This prompt has more detail and demonstrates generated output that might be
closer to what you want in your video.

| **Prompt** | **Generated output** |
| --- | --- |
| Create a short 3D animated scene in a joyful cartoon style. A cute creature with snow leopard-like fur, large expressive eyes, and a friendly, rounded form happily prances through a whimsical winter forest. The scene should feature rounded, snow-covered trees, gentle falling snowflakes, and warm sunlight filtering through the branches. The creature's bouncy movements and wide smile should convey pure delight. Aim for an upbeat, heartwarming tone with bright, cheerful colors and playful animation. Consider adding subtle, whimsical sound effects to enhance the joyful winter atmosphere. | |

## More tips for writing prompts

The following tips help you write prompts that generate your videos:

- **Use descriptive language**: Use adjectives and adverbs to paint a clear
 picture for Veo.
- **Provide context**: If necessary, include background information to help your
 model understand what you want.
- **Reference specific artistic styles**: If you have a particular aesthetic
 in mind, reference specific artistic styles or art movements.
- **Utilize prompt engineering tools**: Consider exploring prompt engineering
 tools or resources to help you refine your prompts and achieve optimal
 results. For more information, see [Introduction to
 prompting](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).
- **Enhance the facial details in your personal and group images**: Specify
 facial details as a focus of the photo like using the word *portrait* in
 the prompt.

## Add more details to prompts

These examples show you how to refine your prompts to generate your videos.

### Subject description

This example shows you how to specify a subject description.

| **Subject description** | **Prompt** | **Generated output** |
| --- | --- | --- |
| This description can include a subject, multiple subjects and actions, such as "white concrete apartment building." | An architectural rendering of a white concrete apartment building with flowing organic shapes, seamlessly blending with lush greenery and futuristic elements | |

### Context

This example shows you how to specify context.

| **Context** | **Prompt** | **Generated output** |
| --- | --- | --- |
| The background or context in which the subject will be placed is very important. Try placing your subject in a variety of backgrounds like on a busy street, in outer space | A satellite floating through outer space with the moon and some stars in the background. | |

### Action

This example shows you how to specify action.

| **Action** | **Prompt** | **Generated output** |
| --- | --- | --- |
| What is the subject doing like walking, running, or turning their head. | A wide shot of a woman walking along the beach, looking content and relaxed and looking towards the horizon at sunset. | |

### Style

This example shows you how to specify style.

| **Style** | **Prompt** | **Generated output** |
| --- | --- | --- |
| You can add keywords to improve generation quality and steer it to closer to intended style, such as shallow depth of field, movie still, minimalistic, surreal, vintage, futuristic, double-exposure. | Film noir style, man and woman walk on the street, mystery, cinematic, black and white. | |

### Camera motion

This example shows you how to specify camera motion.

| **Camera motion** | **Prompt** | **Generated output** |
| --- | --- | --- |
| POV shot, aerial view, tracking drone view, tracking shot | A POV shot from a vintage car driving in the rain, Canada at night, cinematic. | |

### Composition

This example shows you how to specify composition.

| **Composition** | **Prompt** | **Generated output** |
| --- | --- | --- |
| How the shot is framed (wide shot, close-up, low angle) | Extreme close-up of a an eye with city reflected in it. | |
| How the shot is framed (wide shot, close-up, low angle) | Create a video of a wide shot of surfer walking on a beach with a surfboard, beautiful sunset, cinematic. | |

### Ambiance

This example shows you how to specify ambiance.

| **Ambiance** | **Prompt** | **Generated output** |
| --- | --- | --- |
| Adding colors helped make the image look unique and convey intended emotions "muted orange warm tones," "natural light," "sunrise / sunset". Color palettes play a vital role in photography, influencing the mood and emotional impact of an image, and making the image style consistent. For example, a warm, golden palette can infuse a romantic and atmospheric feel into a photograph. Example of color palettes: "pastel blue and pink tones," "dim ambient lighting," "cold muted tones" | A close-up of a girl holding adorable golden retriever puppy in the park, sunlight. | |
| Adding colors helped make the image look unique and convey intended emotions "muted orange warm tones," "natural light," "sunrise / sunset". Color palettes play a vital role in photography, influencing the mood and emotional impact of an image, and making the image style consistent. For example, a warm, golden palette can infuse a romantic and atmospheric feel into a photograph. Example of color palettes: "pastel blue and pink tones," "dim ambient lighting," "cold muted tones" | Cinematic close-up shot of a sad woman riding a bus in the rain, cool blue tones, sad mood. | |

## Use reference images to generate videos

You can bring images to life by using the image-to-video capability that Veo has
and use your existing assets or Imagen to generate something new.

| **Prompt** | **Generated output** |
| --- | --- |
| Bunny with a chocolate candy bar. | |
| Bunny runs away. | |

## Negative prompts

Negative prompts can be a powerful tool that helps specify what elements to keep
out of the video. Describe what you want to discourage the model from generating
by describing what you want the model to generate. Follow these tips:

- ❌ Don't use instructive language or words like *no* or *don't*. For example,
 "No walls" or "don't show walls".
- ✅ Do describe what you don't want to see. For example, "wall, frame", which
 means that you don't want a wall or a frame in the video.

| **Prompt** | **Generated output** |
| --- | --- |
| Generate a short, stylized animation of a large, solitary oak tree with leaves blowing vigorously in a strong wind. The tree should have a slightly exaggerated, whimsical form, with dynamic, flowing branches. The leaves should display a variety of autumn colors, swirling and dancing in the wind. The animation should feature a gentle, atmospheric soundtrack and use a warm, inviting color palette. | |
| Generate a short, stylized animation of a large, solitary oak tree with leaves blowing vigorously in a strong wind. The tree should have a slightly exaggerated, whimsical form, with dynamic, flowing branches. The leaves should display a variety of autumn colors, swirling and dancing in the wind. The animation should feature a gentle, atmospheric soundtrack and use a warm, inviting color palette. With negative prompt - urban background, man-made structures, dark, stormy, or threatening atmosphere. | |

## Aspect ratios

Vertex AI Veo video generation supports the following two aspect
ratios:

| **Aspect ratio** | **Description** |
| --- | --- |
| Widescreen or 16:9 | Has replaced 4:3 and is the most common aspect ratio for televisions, monitors, and mobile phone screens (landscape). Use this when you want to capture more of the background like scenic landscapes. |
| Portrait or 9:16 | Widescreen but rotate. This a relatively new aspect ratio that has been popularized by short form video applications, such as Youtube shorts. Use this for portraits or tall objects with strong vertical orientations, such as buildings, trees, waterfall, or buildings. |

### Widescreen - aspect ratio of 16:9

This is a prompt example of the widescreen with an aspect ratio of 16:9.

| **Prompt** | **Generated output** |
| --- | --- |
| Create a video with a tracking drone view of a man driving a red convertible car in Palm Springs, 1970s, warm sunlight, long shadows. | |

### Portrait - aspect ratio of 9:16

This is a prompt example of portrait with an aspect ratio of 9:16.

| **Prompt** | **Generated output** |
| --- | --- |
| Create a video with a smooth motion of a majestic Hawaiian waterfall within a lush rainforest. Focus on realistic water flow, detailed foliage, and natural lighting to convey tranquility. Capture the rushing water, misty atmosphere, and dappled sunlight filtering through the dense canopy. Use smooth, cinematic camera movements to showcase the waterfall and its surroundings. Aim for a peaceful, realistic tone, transporting the viewer to the serene beauty of the Hawaiian rainforest. | |