import { SkillRepository } from './SkillRepository';
export default class Skillservice {
  private skillRepository: SkillRepository;

  constructor(repository: SkillRepository = new SkillRepository()) {
    this.skillRepository = repository;
  }

  async getAll() {
    if (this.skillRepository) {
      console.log(await this.skillRepository.findAllAsync(), 'skills logs');
      return await this.skillRepository.findAllAsync();
    }
  }
  async getSkillsByKeworksSearch(keyword: string) {
    return await this.skillRepository.findBySearchAsync(keyword);
  }
}
