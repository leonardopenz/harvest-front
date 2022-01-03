import axios from "axios";

export default async function index(req, res) {
    const endpoint = req.query.endpoint;
    req.query['endpoint'] = undefined;
    axios({
        baseURL: "http://54.232.55.126",
        url: "/api/" + endpoint,
        params: req.query,
        method: req.method,
        data: req.body,
        headers: req.headers
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.log("Error:", error);
        if (error.response)
            res.status(error.response.status).send();
        else if (error.request)
            res.status(505).send();
    });
}