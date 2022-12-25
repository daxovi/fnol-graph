const saveGraph = require("express").Router();
const modelGraph = require("../../models/graph");

saveGraph.post("/save-graph", (req, res) => {
    const { title, label, datasets } = req.body;
    const graph = new modelGraph({
        title: title,
        label: label,
        datasets: datasets,
    })
    graph.save((err, document) => {
        if (err) {
            return res.json({
                msg: `Bohužel nedošlo k vytvoření uživatele ${JSON.stringify(document)}`
            })
        } else {
            return res.json({
                msg: `Došlo k úspěšnému vytvoření uživatele`, data: `${document._id}`
            })
        }
    })
});

saveGraph.patch("/save-graph/:id", async (request, response) => {
    try {
        await modelGraph.findByIdAndUpdate(request.params.id, request.body);
        await modelGraph.save();
        response.send(modelGraph);
    } catch (error) {
        response.status(500).send(error);
    }
});

saveGraph.get("/save-graph", (req, res) => {
    res.send("Ano, navštívil jsi /save-graph GETEM")
})

module.exports = saveGraph;