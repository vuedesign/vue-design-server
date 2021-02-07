import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import  { Public } from '../../core/decorators/auth.decorator';

@Controller('projects')
@ApiTags('项目模块')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Public()
  @Post()
  @ApiBody({
    description: '添加用户信息',
    type: CreateProjectDto
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
