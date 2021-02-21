import { Controller, Get, Post, Body, Put, Param, Delete, Query, Patch } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto, UpdateFieldDto } from './dto/update-project.dto';
import { ProjectListQueryDto } from './dto/project.dto';

@Controller('projects')
@ApiTags('项目模块')
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBody({
    description: '添加项目',
    type: CreateProjectDto
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() query: ProjectListQueryDto) {
    console.log('query', query);
    const { size, page } = query;
    let order = {
      updatedAt: 'DESC'
    };
    if (query.order) {
      const [orderKey, orderValue]: Array<string> = query.order.split(' ');
      order[orderKey] = orderValue;
    }

    return this.projectService.findAll({ size, page, order});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProject: UpdateProjectDto) {
    return this.projectService.update(+id, updateProject);
  }

  @Patch(':id')
  updateField(@Param('id') id: string, @Body() updateField: UpdateFieldDto) {
    console.log('updateField', id, updateField);
    return this.projectService.updateField(+id, updateField);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
