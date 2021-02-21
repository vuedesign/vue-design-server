import { Repository } from 'typeorm';

export interface IPaginationResponse {
  list: Array<any>;
  pagination: {
    page: number;
    size: number;
  },
  total: number;
};

export interface IPaginationQuery {
  page: number;
  size: number;
  [key: string]: any;
};

export class BaseService {
  constructor(private readonly currentRepository: Repository<any>) {}

  async findListAndPage(query?: IPaginationQuery): Promise<IPaginationResponse>{
    const { page = 1, size = 20, ...other } = query;
    const [list, total]: [Array<any>, number] = await this.currentRepository.findAndCount({
      take: size,
      skip: (page - 1) * size,
      ...other
    });
    return {
      list,
      pagination: {
        page,
        size
      },
      total
    };
  }
}
