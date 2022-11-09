import { createReadStream, writeFileSync } from "fs";
import { Configuration, OpenAIApi } from "openai";

import { apiKey } from "./apiKey";

const configuration = new Configuration({
  apiKey: { apiKey },
});

const openai = new OpenAIApi(configuration);

const src = "./mona.png";

const result = await openai.createImageVariation(
  createReadStream(`./img/${src}`),
  1,
  "1024x1024"
);

const url = result.data.data[0].url;
console.log(url);

//save image to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img/${Date.now()}.png`, buffer);
