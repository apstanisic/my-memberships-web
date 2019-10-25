export interface Image extends ImageSizes {
  id: string; // uuid
  position: number; // In case of storing image in array. Zero index
}

export interface ImageSizes {
  xs?: string; // 168px
  sm?: string; // 320px
  md?: string; // 640px
  lg?: string; // 1280px
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
}
