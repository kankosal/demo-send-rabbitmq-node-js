var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(async function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const queueMessageKey = "cashier.transfer.sg.to.mysabay.user";
    await channel.assertExchange(queueMessageKey, 'fanout', {
      durable: true,
    });
    const assertQueue = await channel.assertQueue('', { exclusive: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueMessageKey);

    if (assertQueue.queue) {
      channel.prefetch(1);
      channel.bindQueue(assertQueue.queue, queueMessageKey, '');

      channel.consume(
        assertQueue.queue,
        async msg => {
          try {
            const messageBody = msg.content.toString();
            const data = JSON.parse(messageBody);
            const { txn_hash: txnHash } = data;
            console.log(
              `Exchange ${queueMessageKey} received hash: ${txnHash}`
            );
          } catch (error) {
            console.log("Error: ", error);
          }
        },
        { noAck: true }
      );
    }
  });
});
