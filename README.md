# Riffusion App

Riffusion is an app for real-time music generation with stable diffusion.

Read about it at https://www.riffusion.com/about and try it at https://www.riffusion.com/.

* Web app: https://github.com/riffusion/riffusion-app
* Inference server: https://github.com/riffusion/riffusion
* Model checkpoint: https://huggingface.co/riffusion/riffusion-model-v1
* Google Colab notebook: [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1FhH3HlN8Ps_Pr9OR6Qcfbfz7utDvICl0?usp=sharing)
* Gradio Web Demo: [![Hugging Face Spaces](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Spaces-blue)](https://huggingface.co/spaces/fffiloni/spectrogram-to-music)


This repository contains the interactive web app that powers the website.

It is built with Next.js, React, Typescript, three.js, Tailwind, and Vercel.

## Run

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, make sure you have Node v18 or greater installed using `node --version`.

Install packages:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

The app home is at `pages/index.js`. The page auto-updates as you edit the file. The about page is at `pages/about.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Inference Server

To actually generate model outputs, we need a model backend that responds to inference requests via API. If you have a large GPU that can run stable diffusion in under five seconds, clone and run the instructions in the [inference server](https://github.com/hmartiro/riffusion-inference) to run the Flask app.

You will need to add a `.env.local` file in the root of this repository specifying the URL of the inference server:

```
RIFFUSION_FLASK_URL=http://127.0.0.1:3013/run_inference/
```

## Citation

If you build on this work, please cite it as follows:

```
@article{Forsgren_Martiros_2022,
  author = {Forsgren, Seth* and Martiros, Hayk*},
  title = {{Riffusion - Stable diffusion for real-time music generation}},
  url = {https://riffusion.com/about},
  year = {2022}
}
```
