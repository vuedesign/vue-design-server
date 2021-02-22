import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  id: number;
  uuid: string;

  @ApiProperty({
    description: '项目名称'
  })
  name: string;

  @ApiProperty({
    description: '项目描述'
  })
  description: string;

  @ApiProperty({
    description: '标签'
  })
  tagIds: string;

  @ApiProperty({
    default: 2,
    description: '作者id'
  })
  authorId: number;

  @ApiProperty({
    default: 1,
    description: '是否可用：1-可用，2-不可用'
  })
  isShow: number;

  createdAt: Date;

  updatedAt: Date;
}
