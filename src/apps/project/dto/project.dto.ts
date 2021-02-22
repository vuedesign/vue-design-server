import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class ProjectListQueryDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    description: '每页数量',
    default: 20,
    required: false,
    type: 'int'
  })
  size?: number = 20;

  @ApiProperty({
    description: '当前页数',
    default: 1,
    required: false,
    type: 'int'
  })
  page?: number = 1

  @ApiProperty({
    description: '排序',
    default: 'updatedAt DESC',
    required: false,
    type: 'string'
  })
  order?: string;

  @ApiProperty({
    description: '标签过滤',
    default: 0,
    required: false,
    type: 'int'
  })
  tagId?: number;
}
