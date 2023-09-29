const AsyncHandler = require("express-async-handler")
const Client = require("../models/ClientModel")

//crear el cliente
const createClient = AsyncHandler(async (req, res) => {
    const { nombre, direccion, telefono, cartera } = req.body

    if (!nombre || !direccion || !telefono || !cartera) {
        res.status(400)
        throw new Error("Por favor, llene todos los campos")
    }

    const client = await Client.create({
        nombre,
        direccion,
        telefono,
        cartera
    })

    res.status(201).json(client)
});

//obtener todos los clientes
const getClients = AsyncHandler(async (req, res) => {
    const clients = await Client.find().sort("-createdAt")
    res.status(200).json(clients)
});

//obtener un cliente por id
const findClient = AsyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id)
    if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" })
    }
    res.status(200).json(client);
})

//actualizar un cliente por id
const updateClient = AsyncHandler(async (req, res) => {
    const { nombre, direccion, telefono, cartera } = req.body
    const updatedClient = await Client.findByIdAndUpdate(
        req.params.id,
        { nombre, direccion, telefono, cartera },
        { new: true, runValidators: true }
    )
    if (!updatedClient) {
        return res.status(404).json({ error: "Cliente no encontrado" })
    }
    res.status(200).json(updatedClient)
})

//eliminar un cliente por id
const deleteClient = AsyncHandler(async (req, res) => {
    const deletedClient = await Client.findByIdAndRemove(req.params.id)
    if (!deletedClient) {
        return res.status(404).json({ error: "Cliente no encontrado" })
    }
    res.status(200).json(deletedClient)
});

module.exports = {
    createClient,
    getClients,
    findClient,
    updateClient,
    deleteClient
};