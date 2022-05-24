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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        street_address: req.body.street_address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        email: req.body.email,
        company_name: req.body.company_name,
        phone_Num: req.body.phone_Num,
        job_role: req.body.job_role,
        skill_requirements1: req.body.skill_requirements1,
        skill_requirements2: req.body.skill_requirements2,
        skill_requirements3: req.body.skill_requirements3,
        content: req.body.content,
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
