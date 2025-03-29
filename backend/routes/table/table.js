const express = require('express');
const { Table } = require('../../models');
const router = express.Router();

// POST /api/tables - Add a new table
router.post('/create', async (req, res) => {
  try {
    const { number } = req.body;
    const newTable = new Table({ number });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tables - List all tables

router.get('/list', async (req, res) => {
  try {
    let { currentPage = 1, pageSize = 10 } = req.query;

    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);

    const skip = (currentPage - 1) * pageSize;

    const totalCount = await Table.countDocuments();

    const items = await Table.find().skip(skip).limit(pageSize);

    res.status(200).json({
      rows: items,
      count: totalCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;