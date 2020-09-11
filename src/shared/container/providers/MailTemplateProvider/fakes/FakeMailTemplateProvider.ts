import IMailTemplateProvader from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvader{
  public async parse():Promise<string>{
    return 'template qual qquer'
  }
}

export default FakeMailTemplateProvider
