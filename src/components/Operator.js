export default class Operator {
  constructor(name, level, variables, getTemplate, getResult) {
    this.name = name;
    this.level = level;
    this.variables = variables.map((variable) => {return eval(variable)});
    this.getTemplate = eval(getTemplate);
    this.getResult = eval(getResult);
  }

  get template () {
    return this.getTemplate(this.variables)
  }

  get result () {
    return this.getResult(this.variables)
  }
}
