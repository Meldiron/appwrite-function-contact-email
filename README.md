# Maizzle Netlify Identity Starter

HTML email templates for [Netlify Identity](https://www.netlify.com/docs/identity/), built with [Tailwind CSS](https://tailwindcss.com/) in [Maizzle](https://maizzle.com).

## Installation

First, make sure you have installed the [Maizzle CLI](https://maizzle.com/docs/installation/#install-the-cli-globally) globally:

```sh
npm install -g @maizzle/cli
```

Then, scaffold a new project with this Starter:

```sh
maizzle new maizzle/starter-netlify-identity
```

Develop locally:

```
maizzle serve
```

Build for production:

```
maizzle build production
```

## Usage

After doing changes to the script, do the following:

- `npm run mail:build` to build email template for production
- `npm run appwrite:build` to build appwrite function

To deploy the function to Appwrite, make sure to:

- Create function, if not created already
- Create deployment with manual code, providing file `appwrite-function.tar-gz` and entrypoint `src/index.js`
- Define ENV variables from [Function readme](appwrite-function/README.md) if not configured already
- Done 🥳 Now you can execute your function with proper input data (payload)

## Documentation

Maizzle documentation is available at https://maizzle.com
