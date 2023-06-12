export class Question {
  topicId: string;
  questionId: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;

  constructor() {
    this.topicId = '';
    this.questionId = '';
    this.question = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.correctAnswer = 1;
  }

  setData(topicId: string, questionId: string, data: any) {
    this.topicId = topicId;
    this.questionId = questionId;
    this.question = data.question;
    this.answer1 = data.answer1;
    this.answer2 = data.answer2;
    this.answer3 = data.answer3;
    this.answer4 = data.answer4;
    this.correctAnswer = data.correctAnswer;
  }

  setTopicId(topicId: string) {
    this.topicId = topicId;
  }

  setQuestionId(questionId: string) {
    this.questionId = questionId;
  }

  setQuestion(question: string) {
    this.question = question;
  }

  setAnswer1(answer1: string) {
    this.answer1 = answer1;
  }

  setAnswer2(answer2: string) {
    this.answer2 = answer2;
  }

  setAnswer3(answer3: string) {
    this.answer3 = answer3;
  }

  setAnswer4(answer4: string) {
    this.answer4 = answer4;
  }

  setCorrectAnswer(correctAnswer: number) {
    this.correctAnswer = correctAnswer;
  }

  getTopicId() {
    return this.topicId;
  }

  getQuestionId() {
    return this.questionId;
  }

  getQuestion() {
    return this.question;
  }

  getAnswer1() {
    return this.answer1;
  }

  getAnswer2() {
    return this.answer2;
  }

  getAnswer3() {
    return this.answer3;
  }

  getAnswer4() {
    return this.answer4;
  }

  getCorrectAnswer() {
    return this.correctAnswer;
  }
}
