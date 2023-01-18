const db = require('_helpers/db');
const Agency = db.Agency;
const Client = db.Client;
const mongoose = require('mongoose');

module.exports = {
    add,
    get,
    update
};


async function add(req, res) {
    let { agency, client } = req.body;
    // const agencyReq = new Agency(agency);
    // client.agencyId = agencyReq._id;

    // await agencyReq.save(async function(err) {
    //     if (err) return handleError(err);

    //     const clientReq = new Client(client);

    //     await clientReq.save(function(err) {
    //         if (err) return handleError(err);
    //     });
    // });


    const clientReq = new Client(client);
    let clientRes = await clientReq.save();
    let clientId = clientRes._id;
    agency.client = clientId;
    const agencyReq = new Agency(agency);
    await agencyReq.save();

    return { msg: "Data Addedd successfully" };

}

async function get(req, res) {
    try {
        // let res = await Agency
        //     .find()
        //     .populate('client').sort({ "total_bill": -1 }).limit(1);

        // let resp = await Agency
        //     .find().sort({ "total_bill": -1 }).limit(1)
        // console.log(resp)
        // const options = {
        //     sort: [
        //         { 'client.total_bill': 'desc' }
        //     ]
        // };
        // let res = await Agency
        //     .find()
        //     // .populate('client');
        //     .populate({ path: 'client', select: 'total_bill', options })

        // return res;


        const maxBillClient = await Client
            .find().sort({ "total_bill": -1 }).limit(-1);
        const clientId = maxBillClient[0].id;

        let agencyData = await Agency
            .findOne({ "client": clientId }).populate('client');



        return agencyData;

    } catch (e) {
        console.log(e);
    }
}

async function update(req, res) {
    let { agency, client } = req.body;
    const id = req.params.id;

    let agencyData = await Agency.findById(id);

    // validate
    if (!agencyData) throw 'Record not found';

    const clientId = agencyData.client;
    Object.assign(agencyData, agency);
    agencyData.client = clientId;
    await agencyData.save();

    const clientData = await Client.findById(clientId);
    Object.assign(clientData, client);
    await clientData.save();

    return { msg: "Data Updated successfully" };
}