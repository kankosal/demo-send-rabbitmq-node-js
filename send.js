var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "process-video-flavor-queue";

    var msg2 = JSON.stringify({
      "id":"635756a914d0fc0030821bce",
      "duration":853,
      "codec":"avc1",
      "format":"mp4",
      "uploadStatus":"success",
      "flavors":[
         {
            "flavor":"Source",
            "fileName":"0_b5l1t09g",
            "format":"mp4",
            "codec":"avc1",
            "dimension":"1280 x 720",
            "bitrate":133325,
            "size":28251,
            "uploadStatus":"success"
         }
      ]
   });

    channel.assertQueue(queue, {
      durable: true,
    });
    channel.sendToQueue(queue, Buffer.from(msg2), {
      persistent: true,
    });
    console.log(" [x] Sent ===================================>");
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
