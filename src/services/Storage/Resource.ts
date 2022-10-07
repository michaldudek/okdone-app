export type ResourceId = string;

export type Resource = {
  id: ResourceId;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type PartialWithId<T extends Resource> = Partial<T> & Pick<T, 'id'>;
