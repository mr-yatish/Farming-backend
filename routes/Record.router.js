const express = require("express");

const router = express.Router();

const recordRouter = require("../controller/Record.controller");

router.post("/create", recordRouter.createRecord);
router.get("/getAllRecords", recordRouter.getAll);
router.delete("/deleteRecord/:id", recordRouter.deleteRecord);
router.post("/addPayment/:id", recordRouter.addPayment);
// Export the router
module.exports = router;
