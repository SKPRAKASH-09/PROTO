const ExampleModel = require('../models/exampleModel');

// Get all examples
exports.getAllExamples = async (req, res) => {
  try {
    const examples = await ExampleModel.find();
    res.status(200).json({ success: true, data: examples });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Create a new example
exports.createExample = async (req, res) => {
  try {
    const newExample = new ExampleModel(req.body);
    await newExample.save();
    res.status(201).json({ success: true, data: newExample });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get an example by ID
exports.getExampleById = async (req, res) => {
  try {
    const example = await ExampleModel.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ success: false, message: 'Example not found' });
    }
    res.status(200).json({ success: true, data: example });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update an example by ID
exports.updateExample = async (req, res) => {
  try {
    const updatedExample = await ExampleModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedExample) {
      return res.status(404).json({ success: false, message: 'Example not found' });
    }
    res.status(200).json({ success: true, data: updatedExample });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete an example by ID
exports.deleteExample = async (req, res) => {
  try {
    const deletedExample = await ExampleModel.findByIdAndDelete(req.params.id);
    if (!deletedExample) {
      return res.status(404).json({ success: false, message: 'Example not found' });
    }
    res.status(200).json({ success: true, message: 'Example deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};