import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiTags, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectListQueryDto } from './dto/project.dto';
import  { Public } from '../../core/decorators/auth.decorator';

@Controller('projects')
@ApiTags('项目模块')
@ApiBearerAuth()
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
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
