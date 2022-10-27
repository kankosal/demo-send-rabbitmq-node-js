const amqp = require("amqplib");
async function fanoutExchange(){
    try{
        const rabbitmqUrl = "amqp://localhost";
        const connection = await amqp.connect(rabbitmqUrl);
        const exchange = "cashier.transfer.sg.to.mysabay.user";
        // const exchange = "mysabay.user.purchase.ak.gold";
        const exchangeType = "fanout";
        const routingKey = "";
        const options = {};
        const payload = {
            txn_hash:
              "f29b63bff9332cbd1de7f938a4561551973b5f50e5fdcbcb8e26d98a541d1592"
          };
        let channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);
        channel.publish(
            exchange,
            routingKey,
            Buffer.from(JSON.stringify(payload)),
            options
        );
    }catch(error){
        console.error(error)
    }
}

fanoutExchange();


// amqp.connect("amqp://localhost", function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(async (error1, channel) => {
//     if (error1) {
//       throw error1;
//     }

//     const exchangeKey = "mysabay.user.purchase.video";
//     const exchangeType = "fanout";
//     const routingKey = "";
//     const options = {};
//     const payload = {
//         vehicleType: "car",
//         numberOfPassenger: 3,
//     };

//     await channel.assertExchange(exchangeKey, exchangeType, options);
//     channel.publish(
//         exchangeKey,
//         routingKey,
//         Buffer.from(JSON.stringify(payload)),
//         options
//     );
    
//     console.log(" [x] Sent ===================================>");
//   });
//   setTimeout(function () {
//     connection.close();
//     process.exit(0);
//   }, 500);
// });
