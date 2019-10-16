- Add default.json in config folder and add mongoURI and jwtSecret

# Storefront

[Storefront](https://agile-eyrie-09648.herokuapp.com/)

## Getting Started

After cloning, add file 'default.json' in the config folder in root directory,
add this block to it :

<pre>
<code> {
  "mongoURI": <your-mongo-URI-goes-here>,
  "jwtSecret": "secret"
}
 </code>
</pre>

Update the mongoURI to your own, I've used MongoDB Atlas, you can use your local instance of mongodb.

Copy this command and run in root folder,

<pre>
<code> npm install && npm run client-install </code>
</pre>

Then run this script to concurrently run the server and the client.

<pre>
<code> npm run dev </code>
</pre>

### Prerequisites

Node, express & react.

## Built with the MERN stack

- MongoDB
- Express
- React
- Node
- Reactstrap

## Authors

- **Michael Ionov** - [invm](https://github.com/invm)

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
