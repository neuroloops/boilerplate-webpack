# boilerplate-webpack
boiler plate avec webpack, eslint airbn&amp;b, 2 pages template html

## travailler avec des loaders

### importer des fichiers CSS dans webpack
### compiler des fichies SASS
### configurer le post-traitement des fichiers CSS
ajout de preloader
1. installation
`npm install postcss-loader autoprefixer --save-dev`
2. configuration
```json
{
test: /\.(css|scss)$/,
use: [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [autoprefixer()],
    },
  },
  'sass-loader',
],
},
```

### importer des images avec webpack
### utiliser url-loader
1. installation
`npm install url-loader --save-dev`
2. configuration
```json
{
test: /\.(jpg|jpeg|gif|png|svg)$/,
use: [
  {
    loader: 'url-loader',
    options: {
      limit: 102400,
      name: '[name].[ext]',
      outputPath: 'images',
    },
  },
],
},
```
il va creer un une image dans les dossier `outputPath`

le limit sert a fixer un limite de taille pour regenerer l'image, en dessous il va creeer un CSS de celle-ci optimisé

### Importer des polices de caractère 

1. installation
`npm install @fortawesome/fontawesome-free --save `
2. configuration
rajoute dans le styles.scss:
```sass
@import '~@fortawesome/fontawesome-free/css/all.css'
```

puis par exemple afficher un icone dans index.html :

`<i class="fas fa-search"></i>`

enfin configurer webpack conf :

```json
{
test: /\.(woff(2)?|ttf|eot|svg)$/,
use: [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts',
    },
  },
],
},
```

### tirer parti des dernière nouveautés du js avec Babel
permet de compiler le code vers une ancienne version de javascript 

1. installation
`npm install babel-loader @babel/core @babel/preset-env --save-dev`

2. config
```json
{
test: /\.js$/,
exclude: /node_modules/,
use: [
  {
    loader: 'babel-loader',
    options: { presets: ['@babel/preset-env'] },
  },
],
},
```

## utiliser les plug-ins et les optimisations

### creer des configuration multiples

utile pour avoir une config de dev et une autre de prod
creer 2 fichiers :
- `webpack.dev.js`
- `webpack.prod.js`
- renomer `webpack.common.js` => `webpack.common.js`
1. installation
`npm install webpack-merge --save-dev`

2. config
**package.json**
```json
  "scripts": {
    "prod": "node_modules/.bin/webpack --config webpack.prod.js",
    "dev": "node_modules/.bin/webpack --config webpack.dev.js"
  },
```

**webpack.dev.js**

```javascript
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
});
```

**webpack.prod.js**

```javascript
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
});
```
> Pour executer webpack en mode dev :
`npm run dev`

> Pour le mode prod:
`npm run prod`

### Utiliser webpack-dev-server
1. install
 `npm install webpack-dev-server --save-dev`
2. config
`webpack.dev.js`

```javascript
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});
```

`package.json`
```json
  "scripts": {
    "prod": "node_modules/.bin/webpack --config webpack.prod.js",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.dev.js"
  },
  
```


### gerer le cache du navigateur
Pour gere le cache on va demander a notre application de generer un nouveau nom de fichier à chaque changement de celui-ci
on rajoute le tag `[contenthash]` dans:

`webpack.common.js`
```js
  output: {
    filename: 'js/site-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
```

### genere des fichier html
permet de creer des templates

1. installation
`npm install html-webpack-plugin --save-dev`
2. deplacer `index.html` vers `./src/templates/
3. configurer `webpack.common.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
    }),
  ],
```

### vider le dossier DIST
1. installation
 `npm install clean-webpack-plugin --save-dev`
2. config
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
...
  plugins: [
    new CleanWebpackPlugin(),
  ]
```
### extraire les fichiers css
1. installation
`npm install mini-css-extract-plugin --save-dev`

### minifier le CSS
1. installation
`npm install optimize-css-assets-webpack-plugin --save-dev`
2. config `webpack.prod.js`

```js
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
...

  optimization: {
    minimizer: [new OptimizeCssPlugin()],
  },
  
```
mais en faisant ça on écrase la config par defaut de webpack pour minifier le js, il faut donc installer le pluging 

`npm install terser-webpack-plugin --save-dev`


```js
const TerserJsPlugin = require('terser-webpack-plugin')
...
optimization: {
    minimizer: [
      new OptimizeCssPlugin(),
      new TerserJsPlugin({
        parallel: true,
      }),
    ],
  },
```
> option prallel permet de compiler plus vite, en multi proccess parallel.

