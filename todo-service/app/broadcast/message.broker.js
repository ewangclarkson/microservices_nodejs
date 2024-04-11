const amqplib = require('amqplib');
const config = require('config');

const queue = config.get("rabbitMq.queue");
const host = config.get("rabbitMq.host");

createChannel()
    .then(() => console.log("chan created"))
    .catch(() => console.error('error occurred'));

async function createChannel() {
    this.conn = await amqplib.connect(host);
    this.channel = await this.conn.createChannel();
    await this.channel.assertQueue(queue);
    return this.channel;
}


async function subScribeToEvent(service) {
    // const chan = await createChannel();
    const conn = await amqplib.connect(host);
    const channel = await conn.createChannel();
    await channel.assertQueue("SHOPPING_QUEUE");
   // const resource = await channel.consume("SHOPPING_QUEUE");
     channel.consume("SHOPPING_QUEUE", (msg) => {
        if (msg !== null) {
            console.log('Recieved:', msg.content.toString());
            channel.ack(msg);
        } else {
            console.log('Consumer cancelled by server');
        }
    });
    // console.log(resource);
    // const {event, data} = JSON.parse(resource.content.toString());
    // console.log(JSON.parse(resource.content.toString()));
    //this.channel.ack(data);
}


async function publishEvent(chan, payload) {
    console.log('authoring queue publish');
    chan.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
}

module.exports = {
    createChannel,
    subScribeToEvent,
    publishEvent
}
