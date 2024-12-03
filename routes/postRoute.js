const express = require("express");
const post_route = express();

const bodyParser = require("body-parser");
const { contactuspostCotnroller } = require("../controller/ContactUsController");
const { blogspostCotnroller } = require("../controller/commonControlers/blogsController");





post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));



post_route.post("/contactpost", contactuspostCotnroller);

// Blogs
post_route.post("/blogspost", blogspostCotnroller);


module.exports = post_route;
