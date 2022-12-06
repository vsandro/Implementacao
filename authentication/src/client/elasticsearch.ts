import 'dotenv/config';
import elasticsearch from 'elasticsearch';


function getClient() {
  const client = new elasticsearch.Client({
    host:  process.env.ELASTIC,
    // log: 'trace'
  });

  return client;
}

export default getClient;