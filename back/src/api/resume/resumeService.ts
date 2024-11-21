import { ResumeRepository } from './resumeRepository';
export default class Skillservice {
  private resumeRepository: ResumeRepository;

  constructor(repository: ResumeRepository = new ResumeRepository()) {
    this.resumeRepository = repository;
  }

  async getAll() {
    if (this.resumeRepository) {
      console.log(await this.resumeRepository.findAllAsync());
      return await this.resumeRepository.findAllAsync();
    }
  }
  async getById(id: string) {
    return await this.resumeRepository.findByIdAsync(id);
  }
  async create(body: any) {
    return await this.resumeRepository.createAsync(body);
  }
}
