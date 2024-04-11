const amqplib = require('amqplib');
const config = require('config');

//const queue = config.get("rabbitMq.queue");
const host = config.get("rabbitMq.host");

createChannel()
    .then(() => console.log("chan created"))
    .catch(() => console.error('error occurred'));

async function createChannel() {
    const conn = await amqplib.connect(host);
    const channel = await conn.createChannel();
    await channel.assertQueue("P_QUEUE");
    return  channel;
}


async function subScribeToEvent(service, chan) {
    const resource = chan.consume("PROJECT_QUEUE");
    const {event, data} = JSON.parse(resource.content.toString());
    console.log(JSON.parse(resource.content.toString()));
    chan.ack(data);
}



module.exports = {
    createChannel,
    subScribeToEvent
}
