<h1 align="center">
  Gatsby Pizza Delivery Starter
</h1>

<img src="https://i.ibb.co/y6G6SKT/Screenshot-20200610-010756.png" alt="Screenshot-20200610-010756" width="500px" />

Starter designed for delivery business

[Demo](https://gatsby-pizza-delivery.now.sh/)

## Installation

```sh
gatsby new project-name https://github.com/vse-volod/gatsby-pizza-delivery.git
```

Or manually:

1. Download
2. Unzip
3. Install deps:
```sh
npm i
```


## Features

* Built-in cart with cache
* Multiple currencies support with updated exchange rate
* Order form with [GetForm](https://getform.io/) integration
* Cart animation

## Items edit

All pizzas located in content folder, you can edit it as mdx files. Currently used only info from frontmatter

## Styles customization

This starter using tailwind css inside of styled components powered by Emotion. This was made possible by [twin.macro](https://github.com/ben-rogerson/twin.macro)

Example:

```javascript
import tw from 'twin.macro';
import styled from '@emotion/styled';

const Date = styled.div`
  ${tw`
    uppercase px-6 font-body
  `}
  color: ${(p) => p.theme.colors.light};
`;

export default Date;
```

inside ${tw``} you define tailwind styles, and outside you can use ordinary styled components style, including ThemeUI pre-defined colors.

For tailwind classes customization, use tailwind.config.js* in root of your project. Refer to official [tailwind docs](https://tailwindcss.com/docs/configuration/). Don't forget to import gatsby-theme-california tailwind config. 

*changes of this file my require reload of gatsby development server(due to current twin.macro limitations)

## Colors and fonts customization

All colors and fonts are defined in "tailwind.config.js" in root of this starter. 
To add Google Fonts, go to gatsby-config.js, find "gatsby-plugin-prefetch-google-fonts" section and edit it.

## API's integration
In order to work with [GetForm](https://getform.io/) and [CurrencyConverter](https://www.currencyconverterapi.com/), you need to register there and get your personal API keys. Then, add them to your .env.development :
```
GETFORM_API_KEY="SoMe-KeY"
CURRCONV_API_KEY="SoMe-KeY"
```

## Troubleshooting:
When removing or changing item's name, ensure that you manually removed "cart" item from localStorage

## TODO's:
* separate pages for each item with complete description and more photos
* integration with e.g. Firebase
* auth with personal account page
* order history
* more animations
* headless CMS integration