const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

// PROJECTS Routes

router.get("/", async (req, res) => {
  const project = await Projects.get();

  try {
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving projects." });
  }
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  const actions = await Projects.getProjectActions(id);

  try {
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not retrieve project actions." });
  }
});

router.post("/", validateProject, async (req, res) => {
  const project = await Projects.insert(req.body);

  try {
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding project" });
  }
});

router.put("/:id", async (req, res) => {
  const project = await Projects.update(req.params.id, req.body);

  try {
    if (project) {
      res.status(200).json(project);
    }
  } catch (error) {
    console.log(500).json({ message: "Error updating project" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProj = await Projects.remove(id);

  try {
    res.status(200).json({ message: "Project removed.", deletedProj });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Project could not be removed." });
  }
});

//ACTIONS ROUTES

router.post("/:id/actions", validateProjectId, async (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };
  const action = await Actions.insert(actionInfo);

  try {
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding action to project." });
  }
});

router.delete("/:id/actions/:id", async (req, res) => {
  const { id } = req.params;

  const deletedAction = await Actions.remove(id);

  try {
    res.status(200).json({ message: "Action removed.", deletedAction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Action could not be removed." });
  }
});

// MIDDLEWARE

async function validateProject(req, res, next) {
  const project = await req.body;
  try {
    if (project.name === "" || project.description === "") {
      res
        .status(400)
        .json({ message: "Missing Project name and/or description." });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  const project = await Projects.get(id);

  try {
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(400).json({ message: "Invalid project id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = router;
