import {
  Controller, Get, Post, Body, Put, Param, Delete, Query, Patch,
  Request,
  ParseIntPipe,
  DefaultValuePipe
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto, UpdateFieldDto } from './dto/update-project.dto';
import { Like } from 'typeorm';

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
  create(@Body() createProject: CreateProjectDto, @Request() req): Promise<any> {
    Object.assign(createProject, {
      authorId: req.user.id,
      isShow: 1
    });
    return this.projectService.create(createProject);
  }

  @Get()
  findAll(
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('tagId', new DefaultValuePipe(0), ParseIntPipe) tagId: number,
    @Query('order') order: string,
  ) {

    const options = {
      size,
      page,
      order: {
        updatedAt: 'DESC'
      },
      where: {}
    };

    if (order) {
      const [orderKey, orderValue]: Array<string> = order.split(' ');
      options.order[orderKey] = orderValue;
    }

    if (tagId) {
      options.where['tagIds'] = Like(`%${tagId}%`);
    }

    return this.projectService.findListAndPage(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProject: UpdateProjectDto) {
    return this.projectService.update(id, updateProject);
  }

  @Patch(':id')
  updateField(@Param('id', ParseIntPipe) id: number, @Body() updateField: UpdateFieldDto) {
    console.log('updateField', id, updateField);
    return this.projectService.updateField(id, updateField);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}
