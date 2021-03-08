import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Generated
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({
      comment: '类别id'
  })
  id: number;

  @Column({
      comment: '类别uuid'
  })
  @Generated('uuid')
  uuid: string;

  @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
      comment: '类别名称'
  })
  name: string;

  @Column({
      type: 'varchar',
      width: 255,
      nullable: true,
      comment: '类别描述'
  })
  description: string;

  @Column({
      type: 'int',
      width: 11,
      nullable: true,
      comment: '作者id',
      name: 'author_id'
  })
  authorId: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    comment: '作者id',
    name: 'parent_id'
  })
  parentId: number;


  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    comment: '所属项目id',
    name: 'project_id'
  })
  projectId: number;

  @CreateDateColumn({
      name: 'created_at',
      type: 'timestamp',
      nullable: true,
      comment: '添加时间'
  })
  createdAt: Date;

  @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamp',
      nullable: true,
      comment: '更新时间'
  })
  updatedAt: Date;
};


