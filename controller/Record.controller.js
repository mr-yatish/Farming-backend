const Record = require("../models/Record.model");

// Create a new record
const createRecord = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      note,
      hours,
      minutes,
      perHourRate,
      totalAmount,
      labourCount,
      totalPaid,
      date,
    } = req.body;

    const record = new Record({
      customerName,
      customerPhone,
      customerAddress,
      note,
      hours,
      minutes,
      perHourRate,
      totalAmount,
      labourCount,
      totalPaid,
      date,
    });

    await record.save();
    res.status(201).json({
      status: true,
      message: "Record created successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

// Get All Records
const getAll = async (req, res) => {
  try {
    const records = await Record.find({ status: true, deleteflag: false });

    res.status(200).json({
      status: true,
      message: "Records fetched successfully",
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

module.exports = {
  getAll,
  createRecord,
};
