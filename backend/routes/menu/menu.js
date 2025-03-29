const express = require('express');
const { Menu } = require('../../models');
const authenticateToken = require('../../middleware/auth');
const router = express.Router();
const mongoose = require("mongoose");



router.get('/list', async (req, res) => {
  try {
    let { currentPage = 1, pageSize = 10 } = req.query;

    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);

    const skip = (currentPage - 1) * pageSize;

    const totalCount = await Menu.countDocuments();

    const items = await Menu.find().skip(skip).limit(pageSize);

    res.status(200).json({
      rows: items,
      count: totalCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid menu ID" });
    }

    const updatedData = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedMenu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Буруу ID байна" });
    }

    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ error: "Меню олдсонгүй" });
    }

   
    res.status(200).json({ message: "Меню устгалаа", data: deletedMenu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Menu.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
