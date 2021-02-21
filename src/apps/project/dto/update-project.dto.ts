import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class UpdateFieldDto {
  @ApiProperty({
    description: '要更新的字段'
  })
  field: string;

  @ApiProperty({
    description: '要更新的数据'
  })
  value: string;

  @ApiProperty({
    description: '数据类型'
  })
  type: string
}
