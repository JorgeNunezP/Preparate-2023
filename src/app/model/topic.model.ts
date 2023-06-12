export class Topic {
  topic: string;
  info: string;
  example: boolean;
  urlExample: string;
  id: string;

  constructor() {
    this.topic = '';
    this.info = '';
    this.example = false;
    this.urlExample = '';
    this.id = '';
  }

  setData(id: string, data: any) {
    this.id = id;
    this.topic = data.topic;
    this.info = data.info;
    this.example = data.example;
    this.urlExample = data.urlExample;
  }

  setId(id: string) {
    this.id = id;
  }

  setInfo(topic: string) {
    this.topic = topic;
  }

  setTopic(info: string) {
    this.info = info;
  }

  setExample(example: boolean) {
    this.example = example;
  }

  setUrlExample(urlExample: string) {}

  getId() {
    return this.id;
  }

  getInfo() {
    return this.info;
  }

  getTopic() {
    return this.topic;
  }

  getExample() {
    return this.example;
  }

  getUrlExample() {
    return this.urlExample;
  }
}
