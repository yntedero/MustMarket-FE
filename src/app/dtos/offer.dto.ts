export class OfferDTO {
  id: number;
  title: string;
  description: string;
  userId: number;
  cityId: number;
  categoryId: number;

  constructor(id: number, title: string, description: string, userId: number, cityId: number, categoryId: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.cityId = cityId;
    this.categoryId = categoryId;
  }
}
