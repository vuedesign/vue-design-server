import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto, UpdateFieldDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { BaseService, IPaginationResponse, IPaginationQuery } from '@app/globals/services/base.service';

interface PaginationQuery extends IPaginationQuery{
  order: any
}

@Injectable()
export class ProjectService extends BaseService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {
    super(projectRepository);
  }
  create(createProject: CreateProjectDto) {
    this.projectRepository.create(createProject);
    return this.projectRepository.save(createProject);
  }

  findAll(query?: PaginationQuery): Promise<IPaginationResponse> {
    console.log('query=======', query);
    return this.findListAndPage(query);
  }

  findOne(id: number) {
    return this.projectRepository.findOne({ id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  updateField(id: number, updateField: UpdateFieldDto) {
    const value = updateField.type === 'number' ? Number(updateField.value) : updateField.value;
    return this.projectRepository.update(id, {
      [updateField.field]: value
    });
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
