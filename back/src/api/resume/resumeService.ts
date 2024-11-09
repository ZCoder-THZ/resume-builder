import { ResumeRepository } from './resumeRepository';
export default class ResumeService {
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
}
