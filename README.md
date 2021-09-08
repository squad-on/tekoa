# Tekoa

Projeto de EAD para criação de trilhas de aprendizagens e desafios de forma rápida e dinâmica

### Tecnologias usadas

Embracing the entire project we are using Nuxt.js with some @nuxtjs modules like: 
- auth for athentication
- axios for api requests
- pwa to allow the site to act as a Progressive Web App
- toast to handle errors and present it
 
To compose the client side we are using the Vue.js with some cool libraries like:
- BootstrapVue to compose the layout structure and form controls
- Leaflet to render maps
- vue-goodshare to show share buttons

The server site is composed inside on top of Node.js tecnologies like:
- Mongodb database
- Express to serve the node app
- Mongoose to structure the database
- Passport managing the authentication
- multer for upload
- sharp to thumbnail generation

### Basic features

- Authentication flow and user crud with authorization role
- Front site
- Admin panel
- Pages management
- Blog/Posts
- Events
- Contact form
- Multisites

### Developer instructions

```bash
# Clone this repo
git clone https://github.com/dloopes/tekoa.git

# Go inside downloaded directory
cd directory/

# Install NPM dependecies
$ yarn install

# To run the developer version with hotreload in localhost:3000 run:
$ yarn dev

# The previous command printed you the generated user credentials. Use this info to access the admin panel at:
http://localhost:3000/conta

# To compile and run the production version:
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# Aways run "yarn lint" before commit

```

