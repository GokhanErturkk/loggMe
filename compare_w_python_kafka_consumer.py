from confluent_kafka import Consumer
import json 

c = Consumer({
    'bootstrap.servers': 'localhost',
    'group.id': 'mygroup1',
    'auto.offset.reset': 'earliest',
    # 'max.poll.interval.ms': 10001,
    # 'session.timeout.ms':10000
})

c.subscribe(['mail'])

while True:
    msg = c.poll(1.0)
 
    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue
    
    json_message= json.loads(msg.value().decode('utf-8'))
    print(json_message["err"].keys())



c.close()