import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}
  create(createProject: CreateProjectDto) {
    this.projectRepository.create(createProject);
    return this.projectRepository.save(createProject);
  }

  async findAll(): Promise<{ list: Array<ProjectEntity>, total: number}> {
    const [list, total] = await this.projectRepository.findAndCount();
    return {
      list,
      total
    }
  }

  findOne(id: number) {
    return this.projectRepository.findOne({ id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
