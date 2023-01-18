const express = require('express');
const router = express.Router();
const agencyClientService = require('./agencyClient.service');
const { body, check, query, param, validationResult } = require('express-validator');

// routes
router.post('/add', [
    body("agency.name").isLength({ min: 1 })
    .withMessage('Agency Name is required'),
    body("agency.address1").isLength({ min: 1 })
    .withMessage('Agency Address1 is required'),
    body("agency.state").isLength({ min: 1 })
    .withMessage('State Name is required'),
    body("agency.city").isLength({ min: 1 })
    .withMessage('City Name is required'),
    body("agency.phone_number").isLength({ min: 1, min: 10 })
    .withMessage('Agency Phone Number is required and must be 10 digit'),
    body("client.name").isLength({ min: 1 })
    .withMessage('Client Name is required'),
    body("client.email").isEmail()
    .withMessage('Client Email should valid email'),
    body("client.phone_number").isLength({ min: 1, min: 10 })
    .withMessage('Client Phone Number is required and must be 10 digit'),
    body("client.total_bill").notEmpty().isInt({ min: 1 })
    .withMessage('Total Bill should numeric and > 0'),
], add);
router.get('/get', get);
router.put('/update/:id', [
    param("id").isLength({ min: 1 })
    .withMessage("Id Is Required"),
    body("agency.name").isLength({ min: 1 })
    .withMessage('Agency Name is required'),
    body("agency.address1").isLength({ min: 1 })
    .withMessage('Agency Address1 is required'),
    body("agency.state").isLength({ min: 1 })
    .withMessage('State Name is required'),
    body("agency.city").isLength({ min: 1 })
    .withMessage('City Name is required'),
    body("agency.phone_number").isLength({ min: 1, min: 10 })
    .withMessage('Agency Phone Number is required and must be 10 digit'),
    body("client.name").isLength({ min: 1 })
    .withMessage('Client Name is required'),
    body("client.email").isEmail()
    .withMessage('Client Email should valid email'),
    body("client.phone_number").isLength({ min: 1, min: 10 })
    .withMessage('Client Phone Number is required and must be 10 digit'),
    body("client.total_bill").notEmpty().isInt({ min: 1 })
    .withMessage('Total Bill should numeric and > 0'),
], update);
module.exports = router;


function add(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(401).json({ "Error": error });
    } else {
        agencyClientService.add(req, res)
            .then(data => res.json(data))
            .catch(err => next(err));
    }
}

function get(req, res, next) {
    agencyClientService.get()
        .then(data => res.json(data))
        .catch(err => next(err));
}

function update(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(401).json({ "Error": error });
    } else {
        agencyClientService.update(req, res)
            .then(data => res.json(data))
            .catch(err => next(err));
    }
}