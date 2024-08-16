# Tweeter Project - By: Kyle McParland (Lighthouse Labs 2024)

Tweeter is a streamlined, single-page web application that emulates the core functionalities of Twitter. It was built to hone proficiency in front-end technologies such as HTML, CSS, JavaScript, jQuery, and AJAX -- as well as back-end development with Node.js and Express.

## Installation

- Clone **Tweeter** using the SSH key in the git repo:

```bash
git clone git@github.com:kylemcparland/tweeter.git
cd tweeter/
```

- Install dependencies using `npm install` ( full list documented on bottom of README.md ):

```bash
npm install
```

## How to use
- Initialize the development web server using `npm run local`. The app will be served at [port 8080](http://localhost:8080/) by default.
```bash
npm run local
...
"Tweeter listening on port 8080!"
```
- Connect locally using the url http://localhost:8080/ in your browser! _(Or customize the host using the PORT variable stored in server/index.js)_

## Final Product

![Screenshot](https://raw.githubusercontent.com/kylemcparland/tweeter/master/public/images/run-tweeter.png "Screenshot of terminal running Tweeter")
![Screenshot](https://raw.githubusercontent.com/kylemcparland/tweeter/master/public/images/submit-tweet.gif "Animated gif of submitting a new Tweet")
![Screenshot](https://github.com/kylemcparland/tweeter/blob/master/public/images/responsive-design.gif?raw=true "Animated gif of the layout changing when resizing the window")

## Dependencies + Acknowledgements
This project would not be possible without the following amazing libraries:

1. [Node.js](https://nodejs.org/en/download/package-manager) ^5.10.x

2. [express](https://www.npmjs.com/package/express) ^4.19.2

3. [Sass](https://www.npmjs.com/package/sass) ^1.77.8

4. [body-parser](https://www.npmjs.com/package/body-parser) ^1.20.2

5. [md5](https://www.npmjs.com/package/md5) ^2.1.0

6. [chance](https://www.npmjs.com/package/chance) ^1.0.2

[jquery](https://jquery.com/), [timeago](https://www.npmjs.com/package/timeago): (External JS downloaded on connect)


### Furthermore, these amazing development tools:

[nodemon](https://www.npmjs.com/package/nodemon) ^1.9.2

## Bugs and Issues:
If you encounter any bugs, please feel free to open an issue at [github](https://github.com/kylemcparland/tweeter/issues).

---

#### This project was built for educational purposes. Thank you for checking it out!