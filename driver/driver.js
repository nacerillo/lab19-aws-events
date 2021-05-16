const { Consumer } = require(`sqs-consumer`);
const { Producer } = require("sqs-producer");

const faker = require("faker");

const app = Consumer.create({
  queueUrl: "",
  handelMessage: async (message) => {
    const messageOut = JSON.parse(message.Body);
    const item = JSON.parse(messageOut);
    console.log("Sent Out", item);

    setTimeout(async () => {
      const producer = Producer.create({
        queueUrl: item.vendorId,
        region: "us-west-2",
      });
      await producer.send({
        id: faker.datatype.uuid(),
        body: JSON.stringify(item),
      });
      console.log("Item Delievered");
    }, 2000);
  },
});
