import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';

export default [
    AuthModule,
    UserModule,
    ProjectModule,
    CategoryModule,
    TagModule
];
