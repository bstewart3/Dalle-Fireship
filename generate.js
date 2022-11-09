import { writeFileSync } from "fs";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "",
});

const openai = new OpenAIApi(configuration);

const prompt = "a zia symbol with deep space as the background";

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
});

const url = result.data.data[0].url;
console.log(url);

//save image to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img/${Date.now()}.png`, buffer);
