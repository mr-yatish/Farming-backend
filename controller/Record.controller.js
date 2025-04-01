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
      paymentmode = "cash",
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
      date,
      totalPayments: [
        {
          amount: totalPaid,
          date: date || Date.now(),
          paymentmode: paymentmode,
        },
      ],
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

// Update Record
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
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
      totalPaid =0,
      date,
      paymentmode = "cash",
    } = req.body;
    const record = await Record.findByIdAndUpdate(
      id,
      {
        customerName,
        customerPhone,
        customerAddress,
        note,
        hours,
        minutes,
        perHourRate,
        totalAmount,
        labourCount,
        date,
        totalPayments: [
          totalPaid !== 0 && {
            amount: totalPaid,
            date: date || Date.now(),
            paymentmode: paymentmode,
          },
        ],
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Record updated successfully",
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

// Add Payment
const addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentmode, date } = req.body;

    const record = await Record.findByIdAndUpdate(
      id,
      {
        $push: {
          totalPayments: {
            amount,
            date: date || Date.now(),
            paymentmode,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Payment added successfully",
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
    // latest first on basic of createdAt And Update At

    records.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

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

// Delete Record With Id
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndUpdate(
      id,
      { status: false, deleteflag: true },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Record deleted successfully",
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

module.exports = {
  getAll,
  createRecord,
  deleteRecord,
  addPayment,
  updateRecord,
};
