export type ResourceId = string | number;

export type Resource = {
  id: ResourceId;
  createdAt?: Date;
};

export type FindCriteria<T extends Resource> = {
  where?: { [key in keyof T]?: string };
  orderBy?: keyof T;
  orderDir?: 'asc' | 'desc';
  limit?: number;
  start?: number;
};
