export class CreateOfferModel {
  id: number;
  title: string;
  description: string;
  userId: number;
  cityId: number;
  categoryId: number;

  constructor() {
    this.id = 0;
    this.title = "";
    this.description = "";
    this.userId = 0;
    this.cityId = 0;
    this.categoryId = 0;
  }
}
