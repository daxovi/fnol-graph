var controller = new AbortController();
var signal = controller.signal;

export const loadGraph = async () => {
    const data = await fetch("http://127.0.0.1:5000/get-graph", {signal});

    const finalData = await data.json();
    const { msg, documents } = finalData;
    return documents;
}