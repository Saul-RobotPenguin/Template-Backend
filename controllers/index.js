const Template = require("../models/template");
const fs = require("fs");
const carbone = require("carbone");

const getAllTemplates = async (req, res) => {
  try {
    const template = await Template.find();
    return res.status(200).json({ template });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createTemplate = async (req, res) => {
  try {
    const template = await new Template(req.body);
    await template.save();

    return res.status(201).json({ template });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSingleTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id);

    if (template) {
      let file = template.file;
      let buff = Buffer.from(file, "base64");
      fs.writeFileSync("./documents/Template.docx", buff);
      return res.status(201).json({ template });
    }
    return res.status(404).send("Template does not exist with the given ID");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createUsersCoverLetter = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id);

    if (template) {
      // database converting
      let file = template.file;
      let buff = Buffer.from(file, "base64");
      fs.writeFileSync("./documents/Template.docx", buff);
      //
      //frontend converting
      function base64_encode(file) {
        return (
          `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,` +
          fs.readFileSync(file, "base64")
        );
      }
      //
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      };

      carbone.render(
        "./documents/Template.docx",
        data,
        function (err, usersCoverLetter) {
          if (err) {
            return console.log(err);
          }
          // write the result
          fs.writeFileSync(
            "./documents/UsersCoverLetter.docx",
            usersCoverLetter
          );
          var base64str = base64_encode("./documents/UsersCoverLetter.docx");
          return res.status(202).json({ base64str });
        }
      );
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//Delete Template

const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Template.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Template has been deleted");
    }
    throw new Error("Template has not been found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getSingleTemplate,
  createUsersCoverLetter,
  deleteTemplate,
};
