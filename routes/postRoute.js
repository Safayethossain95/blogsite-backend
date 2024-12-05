const express = require("express");
const post_route = express();

const bodyParser = require("body-parser");
const {
  contactuspostCotnroller,
} = require("../controller/ContactUsController");
const {
  blogspostCotnroller,
  blogsgetCotnroller,
  blogsupdateController,
  blogsdeleteController,
} = require("../controller/commonControlers/blogsController");
const {
  loginController,
  signUpController,
  getlogoutController,
} = require("../controller/loginController");
const {
  teamsPostController,
  teamsGetController,
  teamsUpdateController,
  teamsDeleteController,
} = require("../controller/commonControlers/teamsController");
const {
    servicesPostController,
    servicesGetController,
    servicesUpdateController,
    servicesDeleteController,
} = require("../controller/commonControlers/servicesController");
const { subscribeEmailController } = require("../controller/subscribeEmailController");

post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));

post_route.post("/contactpost", contactuspostCotnroller);

// Blogs
post_route.post("/blogspost", blogspostCotnroller);
post_route.get("/blogsget", blogsgetCotnroller);
post_route.post("/blogsupdate/:id", blogsupdateController);
post_route.delete("/blogsdelete/:id", blogsdeleteController);

// Teams

post_route.post("/teamspost", teamsPostController);
post_route.get("/teamsget", teamsGetController);
post_route.post("/teamsupdate/:id", teamsUpdateController);
post_route.delete("/teamsdelete/:id", teamsDeleteController);

// Services

post_route.post("/servicespost", servicesPostController);
post_route.get("/servicesget", servicesGetController);
post_route.post("/servicesupdate/:id", servicesUpdateController);
post_route.delete("/servicesdelete/:id", servicesDeleteController);

// Login

post_route.post("/login", loginController);
post_route.get("/logout", getlogoutController);

// signup

post_route.post("/signup", signUpController);

// subscribe

post_route.post("/subscribe", subscribeEmailController);


module.exports = post_route;
