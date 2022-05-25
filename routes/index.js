const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/", (req, res) => res.send("This is the root directory"));
//Creating a Template
router.post("/template", controllers.createTemplate);

//Retrieving a template
router.get("/templates", controllers.getAllTemplates);

//Getting Single template
router.get("/templates/:id", controllers.getSingleTemplate);
router.post("/templates/:id", controllers.createUsersCoverLetter);

//Updating Template
router.put("/templates/:id", controllers.updateTemplate);

//Deleting a Template
router.delete("/templates/:id", controllers.deleteTemplate);

module.exports = router;
