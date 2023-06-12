export class UserDevelopment {
  subject: string;
  topic: string;
  progress: number;

  constructor() {
    this.subject = '';
    this.topic = '';
    this.progress = 0;
  }

  setData(subject: string, topic: string, progress: number) {
    this.subject = subject;
    this.topic = topic;
    this.progress = progress;
  }

  setSubject(subject: string) {
    this.subject = subject;
  }

  setTopic(topic: string) {
    this.topic = topic;
  }

  setProgress(progress: number) {
    this.progress = progress;
  }

  getSubject() {
    return this.subject;
  }

  getTopic() {
    return this.topic;
  }

  getProgress() {
    return this.progress;
  }
}
