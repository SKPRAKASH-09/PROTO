const express = require('express');
const exampleController = require('../controllers/exampleController'); // Verify this path
const router = express.Router();

router.get('/', exampleController.getAllExamples); // Ensure this method exists
router.post('/', exampleController.createExample); // Ensure this method exists
router.get('/:id', exampleController.getExampleById); // Ensure this method exists
router.put('/:id', exampleController.updateExample); // Ensure this method exists
router.delete('/:id', exampleController.deleteExample); // Ensure this method exists

module.exports = router;