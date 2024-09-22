https://stackoverflow.com/questions/67309623/how-to-write-a-jsonarray-to-kafka-topic-in-node-js

https://www.confluent.io/blog/getting-started-with-kafkajs/


```sh
docker exec --interactive --tty broker_name  kafka-console-consumer --bootstrap-server broker:9092  --topic mail  --from-beginning --property print.key=true --property print.headers=true --property print.timestamp=true
```