const amqplib = require('amqplib');
const config = require('config');

const queue = config.get("rabbitMq.queue");
const host = config.get("rabbitMq.host");

createChannel()
    .then(() => console.log("chan created"))
    .catch(() => console.error('error occurred'));

async function createChannel() {
    const conn = await amqplib.connect(host);
   const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    return  channel;
}


async function subScribeToEvent(service, chan) {
    const resource = chan.consume("USER_QUEUE");
    const {event, data} = JSON.parse(resource.content.toString());
    console.log(JSON.parse(resource.content.toString()));
    chan.ack(data);
}


async function publishEvent(chan, payload) {
    console.log('authoring queue publish' + chan);
    chan.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
}

module.exports = {
    createChannel,
    subScribeToEvent,
    publishEvent
}
