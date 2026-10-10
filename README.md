# Khumbu Nuru I.T. Services

Vercel-ready copy of the existing Khumbu Nuru website. Includes all page routes, service and blog details, logo, photo, fonts, theme toggle, animations, consultation links, and the inquiry form addressed to khumbunuru@gmail.com.

## Development

Use Node.js 24.x and pnpm 11.25.0.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Validation and build

```sh
pnpm test
pnpm build
pnpm start
```

The project uses the native Next.js build. Vercel configuration is included; no manual build-command override is required. Keep package.json, vercel.json, app, components, lib, and public together at the root of the GitHub repository. Do not upload the ZIP itself or flatten the folders into individual files.

## Vercel deployment

Source repository: https://github.com/mingma32/website-khumbunuru

On Vercel, create a new project and import this repository. Use Next.js as the framework, leave Root Directory at the repository root, and select Node.js 24.x. The included vercel.json supplies the build command and output directory.

The original website is https://khumbu-nuru-it.sandrarobertsa810.chatgpt.site. This copy is prepared for independent hosting on Vercel.

## Inquiry email

FormSubmit submits inquiries to khumbunuru@gmail.com. The owner must complete FormSubmit's one-time email activation. Check inbox and spam for the activation message and click its confirmation link. Actual email arrival cannot be verified by the build or automated tests.

The browser uses the current website origin for inquiry context and successful-return URLs. If JavaScript is disabled and no public domain is configured, FormSubmit uses its own confirmation page. Optionally set NEXT_PUBLIC_SITE_URL in Vercel to your final HTTPS domain (no trailing slash) and redeploy to enable the native form's return URL before JavaScript loads.

## Hosting note

This export targets Vercel. The original ChatGPT Sites publication is a separate website and remains available independently. Files inherited from the starter for Cloudflare tooling are not used by the Next.js build.
